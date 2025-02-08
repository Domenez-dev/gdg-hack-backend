module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define("Score", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    month: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
  });

  Score.associate = (models) => {
    Score.belongsTo(models.Member, { foreignKey: "memberId" });
  };

  return Score;
};
