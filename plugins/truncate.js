import Vue from 'vue'
const truncateText = function(text, length, clamp){
    if (typeof text !== 'string' || !text.length) {
        return text
    }
    clamp = clamp || '...';
    return text.length > length ? text.slice(0, length) + clamp : text;
};

Vue.filter('truncate', truncateText);