export const getPageClasses = (data: Record<string, any>, defaults: Record<string, string> = {}) => {
      const { heading = '', title = '', text = '', container = '', content = '', description = '', overlay = '' } = {...defaults, ...(data?.pageSettings?.classes || {})};
      return { heading, title, text, container, content, description, overlay }
}

export const getBlockClasses = (data: any, defaults: Record<string, string> = {}) => {
      const { block = '', title = '', buttons = '', content = '', panels = '', panel = '' } = {...defaults, ...(data?.blockSettings?.classes || {})};
      return { block, title, buttons, content, panels, panel }
}

export const getCardClasses = (data: any, defaults: Record<string, string> = {}) => {
      const { card = '', title = '', text = '', content = '', media = '', link = "", subtitle = "" } = {...defaults, ...(data?.cardSettings?.classes || {})};
      return { card, title, text, media, content, link, subtitle }
}

export const getHeroClasses = (data: any, defaults: Record<string, string> = {}) => {
      const { content = '', buttons = '', title = '', text = '', media = '', overlay = '' } = {...defaults, ...(data?.heroSettings?.classes || {})};
      return { content, buttons, title, text, media, overlay }
}