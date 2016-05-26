import React from 'react';
import { connect } from 'react-redux';

import { defaultUiBranchAccessor } from './utils';
import { setUIState } from './actions';
import { mapProps } from './utils';

export const addReduxUIState = (
  config, uiBranchAccessor = defaultUiBranchAccessor
) => WrappedComponent => {

  function mapDispatchToProps(dispatch) {
    return {
      setUIState: (state, shouldDeepMerge) => dispatch(setUIState({
        id: config.id,
        shouldDeepMerge,
        state,
      })),
    };
  }

  function mapStateToProps(state) {
    return {
      uiState: uiBranchAccessor(state)[config.id],
    };
  }

  class ExportedComponent extends React.Component {

    static propTypes = {
      uiState: React.PropTypes.object,
      setUIState: React.PropTypes.func.isRequired,
      // resetUIState: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
      this.props.setUIState(config.getInitialState(this.props));
    }

    render() {
      return (
        this.props.uiState
        ? <WrappedComponent {...mapProps(this.props)} />
        : null
      );
    }

  }

  return connect(mapStateToProps, mapDispatchToProps)(ExportedComponent);
};
