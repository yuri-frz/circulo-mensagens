export function createInitialNavigation() {
  return { stack: [{ name: 'conversations', params: {} }], current: { name: 'conversations', params: {} } };
}

export function navigateTo(state, name, params = {}) {
  const route = { name, params };
  const stack = [...state.stack, route];
  return { stack, current: route };
}

export function goBack(state) {
  if (state.stack.length <= 1) return state;
  const stack = state.stack.slice(0, -1);
  return { stack, current: stack[stack.length - 1] };
}

export function openConversationDetails(state, contactId) {
  return navigateTo(state, 'conversationDetails', { contactId });
}
