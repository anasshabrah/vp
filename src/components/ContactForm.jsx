// components/ContactForm.jsx

import { toast } from "react-toastify";
import TextField from "./TextField";
import emailjs from '@emailjs/browser';
import { ImSpinner9 } from "react-icons/im";
import { MdArrowRightAlt } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const ContactForm = ({ className }) => {
    const [noForVerify, setNoForVerify] = useState(0);
    const [isSubmitting, setSubmitting] = useState(false);
    const [humanTestCode, setHumanTestCode] = useState(null);

    useEffect(() => {
        setNoForVerify(Math.round(Math.random() * 11));
    }, [noForVerify]);

    const form = useRef(null);
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    const sendEmail = async (e) => {
        e.preventDefault();
        if (parseInt(humanTestCode) === (11 + noForVerify)) {
            setSubmitting(true);

            try {
                await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
                toast.success("Thanks for contacting me! ☝", {
                    hideProgressBar: false,
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setSubmitting(false);
                form.current.reset();
                setNoForVerify(Math.round(Math.random() * 11));
            } catch (error) {
                toast.error("Failed to send message. Please try again later.", {
                    hideProgressBar: false,
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setSubmitting(false);
                form.current.reset();
                setNoForVerify(Math.round(Math.random() * 11));
            }
        } else {
            toast.error("Addition didn't match!", {
                hideProgressBar: false,
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setNoForVerify(Math.round(Math.random() * 11));
        }
    };

    return (
        <form onSubmit={sendEmail} ref={form} className={className ?? ""}>
            <div className="grid md:grid-cols-2 gap-5 md:gap-7">
                <TextField
                    required
                    name="name"
                    placeholder="Name Here*"
                />
                <TextField
                    required
                    name="email"
                    placeholder="Email Here*"
                />
            </div>
            <TextField
                rows={4}
                required
                name="message"
                className="mt-5"
                multiline={true}
                placeholder="Message Here*"
            />

            <div className="flex items-center mt-5">
                <p className="!mb-0 mr-5">Are you human?</p>
                <h4>11 + {noForVerify} = </h4>
                <input
                    required
                    type="text"
                    onChange={(e) => setHumanTestCode(e.target.value)}
                    className="border border-neutral-200 focus:border-dark outline-0 p-2 h-8 w-16 ml-3"
                />
            </div>

            <div className="text-center md:text-right mt-5">
                <button className="bg-dark text-white text-[12px] px-6 py-3 group" type="submit" disabled={isSubmitting}>
                    {!isSubmitting ? (
                        <>
                            SEND MESSAGE
                            <MdArrowRightAlt className="inline text-xl ml-1 duration-400 group-hover:translate-x-2"/>
                        </>
                    ) : (
                        <>
                            SENDING
                            <ImSpinner9
                                className="icon-spin inline text-xl ml-1 duration-400 group-hover:translate-x-2"
                            />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
