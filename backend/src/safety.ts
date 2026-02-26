/**
 * 🛡️ OuiChat Safety Module
 * Content moderation & parental monitoring
 */

// Mots interdits en français (Québec) et anglais
const FLAGGED_WORDS_FR = [
  "calisse", "calice", "osti", "estie", "crisse", "câlisse",
  "tabarnak", "tabarnac", "tabarnouche", "tabarnane",
  "sacrament", "sacrément", "sacrament",
  "ciboire", "ciboulot", "cibole",
  "torrieu", "torrieux",
  "maudit", "mautadit",
  "bâtard", "salope", "putain", "merde", "con", "conne",
  "fuck", "shit", "bitch", "ass", "damn", "hell",
  "sex", "sexe", "nude", "naked", "porn", "xxx", "nudes"
];

const FLAGGED_PATTERNS = [
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone numbers
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Emails
];

export interface SafetyCheck {
  clean: boolean;
  flags: string[];
  severity: 'low' | 'medium' | 'high';
  action: 'allow' | 'warn' | 'block';
}

export function checkMessage(content: string): SafetyCheck {
  const flags: string[] = [];
  const lowerContent = content.toLowerCase();
  
  // Check bad words
  for (const word of FLAGGED_WORDS_FR) {
    if (lowerContent.includes(word)) {
      flags.push(`bad_word:${word}`);
    }
  }
  
  // Check patterns (PII)
  for (const pattern of FLAGGED_PATTERNS) {
    if (pattern.test(content)) {
      flags.push('personal_info_detected');
    }
  }
  
  // Determine severity
  let severity: 'low' | 'medium' | 'high' = 'low';
  let action: 'allow' | 'warn' | 'block' = 'allow';
  
  const highSeverityWords = ['fuck', 'shit', 'bitch', 'sex', 'porn', 'nude', 'nudes'];
  const hasHighSeverity = flags.some(f => highSeverityWords.some(w => f.includes(w)));
  
  if (hasHighSeverity || flags.length >= 3) {
    severity = 'high';
    action = 'block';
  } else if (flags.length >= 1) {
    severity = 'medium';
    action = 'warn';
  }
  
  return {
    clean: flags.length === 0,
    flags,
    severity,
    action
  };
}

// Log for parent review
export interface SafetyLog {
  id: string;
  childId: string;
  childUsername: string;
  content: string;
  flags: string[];
  severity: string;
  timestamp: Date;
  chatWith: string;
  location?: { lat: number; lng: number };
}

export const safetyLogs: Map<string, SafetyLog[]> = new Map();

export function logSafetyEvent(log: SafetyLog) {
  const parentId = getParentForChild(log.childId);
  if (!parentId) return;
  
  if (!safetyLogs.has(parentId)) {
    safetyLogs.set(parentId, []);
  }
  safetyLogs.get(parentId)!.push(log);
  
  console.log(`🚨 SAFETY ALERT: ${log.childUsername} - ${log.flags.join(', ')}`);
}

function getParentForChild(childId: string): string | null {
  // In real implementation, query database
  const mockParents: Record<string, string> = {
    'child_1': 'parent_1',
    'child_2': 'parent_1',
  };
  return mockParents[childId] || null;
}

// Location tracking
export interface LocationUpdate {
  userId: string;
  lat: number;
  lng: number;
  timestamp: Date;
  accuracy?: number;
}

export const locationHistory: Map<string, LocationUpdate[]> = new Map();

export function updateLocation(update: LocationUpdate) {
  if (!locationHistory.has(update.userId)) {
    locationHistory.set(update.userId, []);
  }
  locationHistory.get(update.userId)!.push(update);
  
  // Keep only last 24 hours of locations
  const locations = locationHistory.get(update.userId)!;
  if (locations.length > 100) {
    locations.shift();
  }
}

export function getChildLocation(parentId: string, childId: string): LocationUpdate | null {
  const locations = locationHistory.get(childId);
  return locations ? locations[locations.length - 1] : null;
}

export function getLocationHistory(childId: string, hours: number = 24): LocationUpdate[] {
  const locations = locationHistory.get(childId) || [];
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  return locations.filter(l => l.timestamp > cutoff);
}
