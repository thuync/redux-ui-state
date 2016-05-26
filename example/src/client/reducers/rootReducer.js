import {
  reduxUIStateReducer,
  DEFAULT_BRANCH_NAME as COMPONENT_STATE_BRANCH_NAME,
} from 'redux-ui-state';

export default (state, action) => ({
  [COMPONENT_STATE_BRANCH_NAME]: reduxUIStateReducer(
    state[COMPONENT_STATE_BRANCH_NAME], action
  ),
});
