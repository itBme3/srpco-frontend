export const getPageClasses = (data: any) => {
      const { classes = { heading: '', title: '', text: '', container: '', content: '' } } = !!data?.pageSettings?.classes ? data.pageSettings : {}
      const { heading = '', title = '', text = '', container = '', content = '' } = classes;
      return { heading, title, text, container, content }
}

export const getBlockClasses = (data: any) => {
      const { classes = { block: '', title: '', buttons: '', content: '' } } = !!data?.blockSettings?.classes ? data.blockSettings : {}
      const { block = '', title = '', buttons = '', content = '' } = classes;
      return { block, title, buttons, content }
}

export const getCardClasses = (data: any) => {
      const { classes = { card: '', title: '', text: '', content: '', media: '' } } = !!data?.cardSettings?.classes ? data.cardSettings : {}
      const { card = '', title = '', text = '', content = '', media = '' } = classes;
      return { card, title, text, media, content }
}

export const getHeroClasses = (data: any) => {
      const { content = '', buttons = '', title = '', text = '', media = '', overlay = '' } = !!data?.heroSettings?.classes ? data.heroSettings.classes : {}
      return { content, buttons, title, text, media, overlay }
}