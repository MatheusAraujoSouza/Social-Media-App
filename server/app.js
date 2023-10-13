import DependencyContainer from './library/di/DependencyContainer.js';
import DependencyLifetime from './library/di/DependencyLifetime.js';
import AutoMapper from './application/automapper/automapper.js';
import PostService from './application/service/postService.js';

const migrate = require('migrate-mongoose');

const container = new DependencyContainer();
container.register('AutoMapper', () => new AutoMapper(), DependencyLifetime.Singleton);
container.register('PostService', () => new PostService(), DependencyLifetime.Transient);



const runMigrations = async () => {
    try {
      await migrate.load({ stateStore: 'migrations' });
      await migrate.up();
      console.log('Migrations applied successfully.');
    } catch (error) {
      console.error('Error applying migrations:', error);
    }
};


runMigrations();
export default container;
