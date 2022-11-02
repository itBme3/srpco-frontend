export const getPageClasses = (data: any) => {
      const { classes = { heading: '', title: '', text: '', container: '', content: '', description: '' } } = !!data?.pageSettings?.classes ? data.pageSettings : {}
      const { heading = '', title = '', text = '', container = '', content = '', description = '' } = classes;
      return { heading, title, text, container, content, description }
}

export const getBlockClasses = (data: any) => {
      const { classes = { block: '', title: '', buttons: '', content: '', panels: "", panel: "" } } = !!data?.blockSettings?.classes ? data.blockSettings : {}
      const { block = '', title = '', buttons = '', content = '', panels = '', panel = '' } = classes;
      return { block, title, buttons, content, panels, panel }
}

export const getCardClasses = (data: any) => {
      const { classes = { card: '', title: '', text: '', content: '', media: '', link: '', subtitle: '' } } = !!data?.cardSettings?.classes ? data.cardSettings : {}
      const { card = '', title = '', text = '', content = '', media = '', link = "", subtitle = "" } = classes;
      return { card, title, text, media, content, link, subtitle }
}

export const getHeroClasses = (data: any) => {
      const { content = '', buttons = '', title = '', text = '', media = '', overlay = '' } = !!data?.heroSettings?.classes ? data.heroSettings.classes : {}
      return { content, buttons, title, text, media, overlay }
}