import React, { Component } from 'react';

import { renderFormInputs, isFormValid } from '../../utils/form';

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
            submitHandler,
            errorMessage
        } = this.props;

        return (
            <React.Fragment>
                {
                    errorMessage &&
                        <span className={classes.errorBlock}>{ errorMessage }</span>
                }

                <div className={classes.form}>
                    <form onSubmit={submitHandler}>
                        <h2>{ formTitle }</h2>
                        <span className={classes.subtitle}>
                            { formSubtitle }
                        </span>

                        { renderFormInputs(formObj, thisObj, formKey) }

                        <button
                            type="submit"
                            className={classes.submitBtn}
                            disabled={!isFormValid(formObj)}>
                            { submitBtnLabel }
                        </button>
                    </form>

                    { this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Form;