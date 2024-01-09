import React, { useState } from 'react';
import Modal from '../../components/Modal';

const TransactionConfirmationModal = ({ isOpen, onClose, closeModal }) => {
    const confirmProceed = () => {
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={'Transaction Confirmation'}
            maxWitdh="sm:max-w-lg"
        >
            <div className="p-6 pt-0">
                <div class="mt-2">
                    <p class="text-base text-slate-500 font-light">
                        Your token purchase has been successfully processed. We
                        are currently finalizing the transaction, and the
                        minting of the asset will be completed within the next
                        72 hours. You will receive a notification as soon as the
                        transaction is fully confirmed.
                    </p>
                    <p class="text-base text-slate-500 font-light mt-5">
                        Thank you for your purchase and patience. If you have
                        any questions, feel free to contact our support team.
                    </p>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        class="inline-flex w-full justify-center rounded-md bg-neutral-800 px-5 py-2 text-lg font-semibold text-white shadow-sm hover:bg-neutral-900/80 sm:ml-3 sm:w-auto"
                        onClick={confirmProceed}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TransactionConfirmationModal;
