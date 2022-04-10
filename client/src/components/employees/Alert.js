import React, {useContext} from 'react';
import { AlertContext } from '../../context/alert/alertContext';

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext)

    if (!alert.visible) {
        return null
    }

    return (
        <div className="col-9 mx-auto mt-3">
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`}>
                { (alert.type == 'success') 
                    ?
                        <i className="bi bi-check-circle-fill"></i>
                    :
                        <i className="bi bi-emoji-frown-fill"></i>
                 }
                 &nbsp;{alert.text}
                <button 
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={hide}
                >
                </button>
            </div>
        </div>
    )
}