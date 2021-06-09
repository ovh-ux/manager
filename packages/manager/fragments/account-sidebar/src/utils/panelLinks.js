import { buildURL } from '@ovh-ux/ufrontend/url-builder';
import { emit } from '@ovh-ux/ufrontend/communication';
import RedirectionService from './redirectionService';

const openChatbot = () => {
  emit({ id: 'ovh.chatbot.open' });
};

const links = (user, hasChatbot, region) => [
  {
    href: RedirectionService?.getURL('help', region, {
      ovhSubsidiary: user?.ovhSubsidiary,
    }),
    icon: 'oui-icon oui-icon-lifebuoy_concept',
    label: 'hub_links_help_center',
  },
  ...(hasChatbot
    ? [
        {
          action: () => openChatbot(),
          icon: 'oui-icon oui-icon-speech-bubble_concept',
          label: 'hub_links_chatbot',
        },
      ]
    : []),
  {
    href: RedirectionService?.getURL('tasks', region),
    icon: 'oui-icon oui-icon-traffic-cone_concept',
    label: 'hub_links_tasks',
  },
  {
    href: buildURL('dedicated', '#/ticket'),
    icon: 'oui-icon oui-icon-envelop_concept',
    label: 'hub_links_tickets',
  },
  ...(['EU', 'CA'].includes(region)
    ? [
        {
          href: buildURL('dedicated', '#/support/tickets/new'),
          icon: 'oui-icon oui-icon-user-support_concept',
          label: 'hub_links_create_ticket',
        },
      ]
    : []),
];

export default links;
