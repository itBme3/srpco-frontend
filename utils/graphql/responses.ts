import { isJsonObject } from '../funcs';

export const parseResponse = (obj: any): any => {
      if (!isJsonObject(obj)) {
            return obj
      }
      const keys = Object.keys(obj);
      if (!!!keys?.length) {
            return obj;
      }
      return keys.reduce((acc, key) => {
            if (key === 'data') {
                  if (obj[key] === null) {
                        return acc
                  }
                  if (Array.isArray(obj.data)) {
                        return { ...acc, ...obj.data.map((_itm: any) => parseResponse({ id: _itm.id, ..._itm.attributes })) }
                  }
                  return { ...acc, ...parseResponse({ id: obj.data.id, ...obj.data.attributes }) }
            }
            if (Array.isArray(obj[key])) {
                  return {
                        ...acc, [key]: obj[key].map((itm: any) => {
                              if (isJsonObject(itm)) {
                                    if (!!itm && !!itm.data) {
                                          if (Array.isArray(itm.data)) {
                                                return itm.data.map((_itm: any) => parseResponse({ id: _itm.id, ..._itm.attributes }))
                                          }
                                          return parseResponse({ id: itm.id, ...itm.data.attributes })
                                    }
                                    return parseResponse(itm)
                              }
                              return itm
                        })
                  }
            }
            if (obj[key] && !!obj[key].data) {
                  if (Array.isArray(obj[key].data)) {
                        return { ...acc, [key]: obj[key].data.map((_itm: any) => parseResponse({ id: _itm.id, ..._itm.attributes })) }
                  }
                  return { ...acc, [key]: parseResponse({ id: obj[key].data.id, ...obj[key].data.attributes }) }
            }
            if (isJsonObject(obj[key])) {
                  return { ...acc, [key]: parseResponse(obj[key]) }
            }
            return { ...acc, [key]: obj[key] };
      }, {})
}