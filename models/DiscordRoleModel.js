module.exports = (sequelize, DataTypes) => {
  const DiscordRole = sequelize.define("DiscordRole", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roleName: { type: DataTypes.STRING, allowNull: false },
    assignedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  });

  DiscordRole.associate = (models) => {
    DiscordRole.belongsTo(models.Member, { foreignKey: "memberId" });
  };

  return DiscordRole;
};
