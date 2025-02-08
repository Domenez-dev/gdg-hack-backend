module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    discord: { type: DataTypes.STRING, unique: true },
    joinedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    engagementZone: { type: DataTypes.STRING },
    monthlyScore: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
  return Member;
};
