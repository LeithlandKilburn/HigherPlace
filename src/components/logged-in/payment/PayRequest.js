import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {PaymentElement} from '@stripe/react-stripe-js';


class PayRequest extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            
        }
    };

    
    render ()
    {
        return(
            <div>
                <form>
                    <PaymentElement />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default PayRequest;