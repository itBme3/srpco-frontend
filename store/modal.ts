
interface ModalData {
      file?: any;
      title?: string;
      text?: string;
      youtube?: string;
      embed?: boolean;
}
type ModalDataType = ModalData | null;
export const state = (): { modalData: ModalDataType } => ({
      modalData: null
});

export const mutations = {
      open(state: any, val: ModalDataType) {
            if (val !== null) {
                  if ((!!val.youtube && val.youtube.length > 0) || (!!val.file && !!val.file.mime && val.file.mime.includes('pdf'))) {
                        state.modalData = val
                  }
            }
      },
      close(state: any) {
            state.modalData = null;
      }
}

export const actions: any = {
      getModalData({ state }: any) {
            return state.modalData
      }
}
