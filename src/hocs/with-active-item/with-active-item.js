import React, {PureComponent} from 'react';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: undefined
      };
    }

    componentDidMount() {
      this.setState({activeItem: this.state.activeItem});
    }

    render() {
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
