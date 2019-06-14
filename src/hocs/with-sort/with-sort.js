import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/data/data';
import {getActiveSort} from '../../reducer/data/selectors';

const withSort = (WrappedComponent) => {
  class WithSort extends PureComponent {
    constructor(props) {
      super(props);

      this.handleOptionsClick = this.handleOptionsClick.bind(this);
      this.handleOptionClick = this.handleOptionClick.bind(this);
      this.state = {opened: false};
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          opened={this.state.opened}
          onOptionsClick={this.handleOptionsClick}
          onOptionClick={this.handleOptionClick}
        />
      );
    }


    handleOptionClick(sort) {
      this.setState({opened: false});
      this.props.switchSort(sort);
    }

    handleOptionsClick() {
      if (this.state.opened) {
        this.setState({opened: false});
      } else {
        this.setState({opened: true});
      }
    }
  }

  WithSort.propTypes = {
    switchSort: PropTypes.func.isRequired
  };

  return WithSort;
};

const mapStateToProps = (state) => {
  return {
    activeSort: getActiveSort(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  switchSort: (sort) => dispatch(Operation.switchSort(sort))
});

const composedWithSort = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withSort
);

export {withSort};
export default composedWithSort;
