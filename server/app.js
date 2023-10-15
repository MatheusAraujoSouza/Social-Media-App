import DependencyContainer from './library/di/DependencyContainer.js';
import DependencyLifetime from './library/di/DependencyLifetime.js';
import AutoMapper from './application/automapper/automapper.js';
import PostService from './application/service/postService.js';

const container = new DependencyContainer();
container.register('AutoMapper', () => new AutoMapper(), DependencyLifetime.Singleton);
container.register('PostService', () => new PostService(), DependencyLifetime.Transient);

export default container;