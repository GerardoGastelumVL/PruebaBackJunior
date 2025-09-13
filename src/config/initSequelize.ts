import 'reflect-metadata';
import sequelize from './sequelize';

export const initializeSequelize = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connection established successfully');
    
    // Sync models with database (creates tables if they don't exist)
    // await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export const closeSequelize = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('✅ Sequelize connection closed successfully');
  } catch (error) {
    console.error('❌ Error closing Sequelize connection:', error);
    throw error;
  }
};
