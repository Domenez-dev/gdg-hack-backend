module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define("Badge", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    awardedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  Badge.associate = (models) => {
    Badge.belongsTo(models.Member, { foreignKey: "memberId" });
  };

  return Badge;
};
