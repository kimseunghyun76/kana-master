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
    const nextTier = TIER_RANK[tier] === undefined ? 'free' : tier;
    if (_currentTier === nextTier) return;
    _currentTier = nextTier;
    window.dispatchEvent(new CustomEvent('entitlements:change', { detail: { tier: _currentTier } }));
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
