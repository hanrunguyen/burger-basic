import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    unMounted = false;

    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        if (this.unMounted) return req;
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        res => res,
        error => {
          if (this.unMounted) return;
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      this.unMounted = true;
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} closeModal={this.errorConfirmHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
