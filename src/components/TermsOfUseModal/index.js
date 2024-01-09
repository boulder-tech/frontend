import React, { useState } from 'react';
import Modal from '../../components/Modal';

import './styles.css';

const TermsOfUseModal = ({ isOpen, onClose, closeModal, acceptTerms }) => {
    const confirmProceed = () => {
        closeModal();
        acceptTerms();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={'Terms Of Use'}
            maxWitdh="sm:max-w-lg"
        >
            <div className="p-6 pt-0">
                <div class="mt-2">
                    <p class="text-base text-slate-500 font-light">
                        The information here is not intended to solicit you to
                        purchase any financial product directly from us. GD30D
                        tokens are not offered by us or by any affiliated entity
                        of ours directly to the public and will only be offered
                        by our affiliated entity to Accredited Investors or
                        Professional Investors. GD30D tokens have not been and
                        will not be registered under the U.S. Securities Act of
                        1933 or with any securities regulatory authority of any
                        State or other jurisdiction of the U.S. You will only be
                        able to purchase GD30D tokens from us if you qualify as
                        an Accredited Investor or Professional Investor as
                        detailed in the Terms and Services. Should you want to
                        redeem GD30D tokens, then you will need to onboard with
                        us and undergo the necessary KYC screening.{' '}
                    </p>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        class="inline-flex w-full justify-center rounded-md bg-neutral-800 px-5 py-2 text-lg font-semibold text-white shadow-sm hover:bg-neutral-900/80 sm:ml-3 sm:w-auto"
                        onClick={confirmProceed}
                    >
                        Proceed
                    </button>
                    <button
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-lg font-semibold border border-neutral-800/10 text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TermsOfUseModal;
