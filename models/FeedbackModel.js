module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedback", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM("warning", "appreciation"), allowNull: false },
    sentOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.Member, { foreignKey: "memberId" });
  };

  return Feedback;
};
