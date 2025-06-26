const rolesByGroup = {
  BLD: ["BLD_KN", "BLD_L", "BLD_NL", "BLD_TC"],
  KET: ["KET", "KET_L", "KET_P"],
  KHO: ["KHO", "KHO_L"],
  KHTH: ["KHTH", "KHTH_L", "KHTH_P"],
  KN: ["KN", "KN_L", "KN_P"],
  KYT: ["KYT", "KYT_L", "KYT_P"],
  MKT: ["MKT", "MKT_L", "MKT_P"],
  NS: ["NS", "NS_L", "NS_P"],
  VT: ["VT", "VT_L", "VT_P"],
};

export const getRoleGroup = (role: string): string | null => {
  for (const [group, roles] of Object.entries(rolesByGroup)) {
    if (roles.includes(role)) return group;
  }
  return null;
};
