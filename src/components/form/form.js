import React, { Component } from 'react';

import { renderFormInputs } from '../../utils/form';

import classes from './form.module.scss';

class Form extends Component {
    render() {
        const {
            formTitle,
            formSubtitle,
            formObj,
            thisObj,
            formKey,
            submitBtnLabel,
            submitHandler
        } = this.props;

        return (
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <h2>{ formTitle }</h2>
                    <span className={classes.subtitle}>
                        { formSubtitle }
                    </span>

                    { renderFormInputs(formObj, thisObj, formKey) }

                    <button type="submit" className={classes.submitBtn}>
                        { submitBtnLabel }
                    </button>
                </form>

                { this.props.children}
            </div>
        );
    }
}

export default Form;