import DependencyContainer from './library/dependencyInjection/DependencyContainer.js';
import DependencyLifetime from './library/dependencyInjection/DependencyLifetime.js';
import AutoMapper from './application/automapper/automapper.js';
import PostService from './application/service/postService.js';
import UserServer from './application/service/userServer.js';
import AppSettingsLoader from './infrastructure/AppSettingsLoader/AppSettingsLoader.js';   

const container = new DependencyContainer();
container.register('AutoMapper', () => new AutoMapper(), DependencyLifetime.Singleton);
container.register('PostService', () => new PostService(), DependencyLifetime.Transient);
container.register('UserServer', () => new UserServer(), DependencyLifetime.Transient);
container.register('AppSettingsLoader', () => new AppSettingsLoader('./configuration/appsettings.json'), DependencyLifetime.Singleton);
export default container;