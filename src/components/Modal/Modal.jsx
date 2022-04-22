import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modalRoot');

class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.closeOnEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeOnEscape);
    }

    closeOnEscape = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    backdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={s.Overlay} onClick={this.backdropClick}>
                <div className={s.Modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot
        );
    }
}

export default Modal;