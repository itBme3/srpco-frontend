<template>
  <client-only>
    <beautiful-chat
      class="chat-box"
      :participants="participants"
      :title-image-url="titleImageUrl"
      :on-message-mas-sent="onMessageWasSent"
      :message-list="messageList"
      :new-messages-count="newMessagesCount"
      :is-open="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :show-emoji="true"
      :show-file="true"
      :show-edition="true"
      :show-deletion="true"
      :deletion-confirmation="true"
      :show-typing-indicator="showTypingIndicator"
      :show-launcher="true"
      :show-close-button="true"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :disable-user-list-toggle="false"
      :message-styling="messageStyling"
      @on-type="handleOnType"
      @edit="editMessage"
    />
  </client-only>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      participants: [
        {
          id: 'srpSupport',
          name: 'Support'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: '/favicon.png',
      messageList: [
        {
          type: 'text', author: `srpSupport`,
          data: {
            text: `How can I help?`,
          },
          suggestions: [`I'm starting a new project`, `I have some questions about your services`, `I'm a current customer and need some help`]
        },
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '',
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage (message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
})
</script>

<style lang="scss">
.chat-box {
  .sc-chat-window {
    box-shadow: 0 30px 30px -20px rgba(0, 0, 0, 0.563),
      0 30px 60px 10px rgba(0, 0, 0, 0.515) !important;
    @apply bg-gray-800;
    @apply z-999 rounded-xl bg-gray-800 overflow-hidden;
  }
  .sc-header {
    @apply bg-gray-700 bg-opacity-50 #{!important};
  }
  .sc-suggestions-row {
    @apply pl-4 pb-6;
    button.sc-suggestions-element {
      @apply border-gray-700 border hover:border-green-400 hover:bg-green-400 text-green-300 hover:text-gray-900 hover:text-opacity-70 #{!important};
    }
  }
  .sc-user-input {
    @apply shadow-lg bg-gray-700 #{!important};
    &.active {
      @apply shadow-none bg-gray-900 bg-opacity-30 #{!important};
    }
    .sc-user-input--text {
      @apply bg-transparent text-white #{!important};
    }
  }
  .sc-launcher {
    @apply text-green-400 bg-gray-700 hover:bg-green-400 z-999 #{!important};

    &:not(.opened) {
      @apply flex items-center justify-center;
      color: black !important;
      &:before {
        @apply text-opacity-80 text-gray-900 flex h-[50px] w-[50px] content-center items-center text-center m-auto;
        font-size: 1.5em;
        content: '\e919' !important;
        font-family: 'SRP-Icons' !important;
        speak: never;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: auto;
        margin: auto;
        display: block;
      }
      img {
        display: none;
      }
    }
    img {
      filter: invert(1);
      @apply opacity-10;
    }
    &.opened {
      @apply bg-red-400 #{!important};
    }
  }
  .sc-message {
    .sc-message--text {
      @apply bg-gray-700 #{!important};
      .sc-message--text-content {
        @apply text-gray-100 #{!important};
      }
      &.sent {
        @apply bg-cyan-100 #{!important};
        .sc-message--text-content {
          @apply text-gray-800 text-opacity-70 #{!important};
        }
      }
    }
  }
  .sc-user-input {
    @apply rounded-lg shadow-2xl bg-gray-700 #{!important};
    &--text {
      @apply bg-gray-50;
    }
    .sc-user-input--button path {
      fill: #fff !important;
    }
  }
  .sc-message--file-name {
    @apply text-gray-900 bg-opacity-75;
  }
  .sc-suggestions-row,
  .sc-message-list {
    @apply bg-gray-800 #{!important};
  }
  .sc-message-list {
    + div {
      @apply p-3;
    }
  }
}
</style>