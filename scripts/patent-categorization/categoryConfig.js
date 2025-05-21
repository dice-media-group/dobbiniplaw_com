// categoryConfig.js
// Configuration settings for patent categorization

// Patent categorization keywords with expanded lists based on TrophyWall.pdf content
const categories = {
  firearms: [
    'firearm', 'gun', 'rifle', 'ammunition', 'barrel', 'sight', 'trigger', 'revolver', 'sling', 'stock', 
    'handgrip', 'shotgun', 'pistol', 'gunstock', 'magazine', 'bolt', 'tang', 'louver', 'charging', 
    'follower', 'foldable', 'fore grip', 'hand guard', 'butt pad', 'reticule', 'rimmed', 'round', 
    'concealable', 'gun chassis', 'fire arm', 'bullpup', 'recoil', 'caliber', 'linkage', 'rear sight',
    'front sight', 'bayonet', 'armament', 'launcher'
  ],
  medical: [
    'medical', 'dental', 'suction', 'gel', 'massage', 'disinfection', 'uv', 'peroxide', 'expandable',
    'bleaching', 'operatory', 'endodontic', 'oral', 'surgeon', 'therapeutic', 'physician', 'patient',
    'treatment', 'healthcare', 'diagnostic', 'therapy', 'clinical', 'healing', 'recovery', 'procedure',
    'hygiene', 'sanitization', 'alcohol', 'sterilize', 'clean', 'dilation', 'anatomy', 'dental bleaching'
  ],
  electronics: [
    'electronic', 'LED', 'semiconductor', 'circuit', 'light', 'loupe', 'sensor', 'emission', 'diode', 
    'digital', 'frequency', 'tracking', 'lighting', 'audio', 'parameter', 'cognitive', 'intelligence',
    'artificial intelligence', 'AI', 'computer', 'processor', 'memory', 'storage', 'capacitor', 'resistor',
    'chip', 'motherboard', 'display', 'screen', 'device', 'output', 'input', 'IoT', 'amplifier',
    'oscillator', 'photonic', 'nano', 'transistor', 'microchip', 'carrier profiling', 'microscopy'
  ],
  manufacturing: [
    'apparatus', 'device', 'system', 'machine', 'assembly', 'manufacturing', 'method', 'process',
    'production', 'industrial', 'factory', 'automation', 'fabrication', 'construction', 'composite',
    'material', 'polymer', 'metal', 'extrusion', 'casting', 'molding', 'forming', 'cutting', 'stamping',
    'welding', 'binding', 'polyvinyl', 'chloride', 'wood-plastic', 'siding', 'building', 'framing',
    'steel', 'asphalt', 'mix', 'recycle', 'pvc', 'concrete', 'structural', 'engineering', 'plant'
  ],
  tools: [
    'tool', 'handle', 'measuring', 'bending', 'clip', 'adjustable', 'positionable', 'adapter', 
    'customizable', 'wrench', 'screwdriver', 'hammer', 'cutting', 'clamp', 'holder', 'gripper',
    'vise', 'guide', 'template', 'pattern', 'gauge', 'calibration', 'positioning', 'alignment',
    'fixture', 'jig', 'work light', 'rack', 'ladder', 'storage', 'bin', 'organizer', 'equipment',
    'hoist', 'lift', 'jack', 'roller', 'slider', 'fastener', 'snap', 'skate', 'blade', 'dispenser'
  ],
  sports: [
    'sport', 'athletic', 'exercise', 'fitness', 'game', 'training', 'workout', 'gym', 'skate',
    'snowboard', 'ski', 'bike', 'bicycle', 'weight', 'resistance', 'aerobic', 'cardio', 'strength',
    'conditioning', 'ball', 'racket', 'paddle', 'stick', 'martial', 'boxing', 'golf', 'tennis',
    'running', 'swimming', 'diving', 'climbing', 'hiking', 'camping', 'outdoor', 'recreation'
  ],
  household: [
    'home', 'house', 'kitchen', 'bathroom', 'bedroom', 'furniture', 'appliance', 'decor', 'fixture',
    'lighting', 'heating', 'cooling', 'ventilation', 'hvac', 'plumbing', 'electrical', 'storage',
    'organization', 'cleaning', 'maintenance', 'repair', 'improvement', 'renovation', 'construction',
    'security', 'safety', 'lock', 'alarm', 'sensor', 'detector', 'monitor', 'camera', 'doorbell'
  ],
  other: []
};

// Category display names and metadata
const categoryMetadata = {
  electronics: ' & Technology',
  manufacturing: ' & Industrial',
  firearms: ' & Accessories',
  tools: ' & Equipment',
  medical: ' Devices',
  household: ' & Living',
  sports: ' & Recreation',
  other: ''
};

export {
  categories,
  categoryMetadata
};
