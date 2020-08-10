import angular from 'angular';

import internetAccess from './internet-access';
import packMove from './move';
import packVoipLineActivation from './slots/voipLine/activation/pack-voipLine-activation.module';
import hostedEmailDetail from './slots/hostedEmail/detail';
import xdsl from './xdsl';

import templates from './pack.templates';

import controller from './pack.controller';
import routing from './pack.routing';

const moduleName = 'ovhManagerTelecomPack';

angular
  .module(moduleName, [
    internetAccess,
    hostedEmailDetail,
    packVoipLineActivation,
    xdsl,
    packMove,
  ])
  .controller('PackCtrl', controller)
  .config(routing)
  .run(templates)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
