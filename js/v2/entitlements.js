/* ============================================================
   Entitlements — access tiers for paid-service migration
   ============================================================ */

'use strict';

window.Entitlements = (() => {
  const TIER_RANK = { free: 0, plus: 1, pro: 2 };
  let _currentTier = 'pro';

  function currentTier() {
    return _currentTier;
  }

  function setTier(tier) {
    _currentTier = TIER_RANK[tier] === undefined ? 'free' : tier;
  }

  function requiredTier(modOrFeature) {
    if (!modOrFeature) return 'free';
    return modOrFeature.accessTier || 'free';
  }

  function canAccess(modOrFeature) {
    return TIER_RANK[currentTier()] >= TIER_RANK[requiredTier(modOrFeature)];
  }

  return { currentTier, setTier, requiredTier, canAccess };
})();
