module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define("Contribution", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskName: { type: DataTypes.STRING, allowNull: false },
    taskWeight: { type: DataTypes.INTEGER, allowNull: false },
    submittedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  Contribution.associate = (models) => {
    Contribution.belongsTo(models.Member, { foreignKey: "memberId" });
    Contribution.belongsTo(models.Event, { foreignKey: "eventId" });
  };

  return Contribution;
};
