export const getPageClasses = (data: any) => {
      const { classes = { heading: '', title: '', text: '', container: '', content: '' } } = !!data?.pageSettings?.classes ? data.pageSettings : {}
      const { heading = '', title = '', text = '', container = '', content = '' } = classes;
      return { heading, title, text, container, content }
}

export const getBlockClasses = (data: any) => {
      const { classes = { block: '', title: '', buttons: '' } } = !!data?.blockSettings?.classes ? data.blockSettings : {}
      const { block = '', title = '', buttons = '' } = classes;
      return { block, title, buttons }
}

export const getCardClasses = (data: any) => {
      console.log({ data })
      const { classes = { card: '', title: '', text: '', content: '', media: '' } } = !!data?.cardSettings?.classes ? data.cardSettings : {}
      const { card = '', title = '', text = '', content = '', media = '' } = classes;
      return { card, title, text, media, content }
}

export const getHeroClasses = (data: any) => {
      const { classes = { content: '', buttons: '', title: '', text: '', media: '' } } = !!data?.heroSettings?.classes ? data.heroSettings : {}
      const { content = '', buttons = '', title = '', text = '', media = '' } = classes;
      return { content, buttons, title, text, media }
}