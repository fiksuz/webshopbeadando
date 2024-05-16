import React, { useState, ChangeEvent, FormEvent } from 'react';
import './regis.css';
interface FormData {
    username: string;
    password: string;
    passwordConfirm: string;
    lastname: string;
    firstname: string;
    shippingAddress: {
        name: string;
        country: string;
        city: string;
        street: string;
        zip: string;
        phoneNumber: string;
    };
}

function Registration() {
    const initialFormData: FormData = {
        username: '',
        password: '',
        passwordConfirm: '',
        lastname: '',
        firstname: '',
        shippingAddress: {
            name: '',
            country: '',
            city: '',
            street: '',
            zip: '',
            phoneNumber: ''
        }
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateFormData()) {
            return;
        }
        showMessage('Sikeres regisztráció');
        setFormData(initialFormData);
    }

    const handleCancel = () => {
        setFormData(initialFormData);
    }

    const validateFormData = () => {
        // Implementáld itt a form validációját
        // Példa: if (!formData.username.trim()) { errorMessage = 'Felhasználónév kötelező'; }
        return true; // Placeholder, ténylegesen vissza kell adni a validitást
    }

    const showMessage = (text: string) => {
        setMessage(text);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: keyof FormData | keyof FormData['shippingAddress']) => {
        const { value } = event.target;
        if (fieldName.includes('.')) {
            const [parentField, childField] = fieldName.split('.') as [keyof FormData['shippingAddress'], keyof FormData['shippingAddress'][keyof FormData['shippingAddress']]];
            setFormData(prevData => ({
                ...prevData,
                shippingAddress: {
                    ...prevData.shippingAddress,
                    [childField]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [fieldName]: value
            }));
        }
    }

    return (
        <div className='container'>
            <h2>Regisztráció</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Felhasználónév (email cím):
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleChange(e, 'username')}
                    />
                </label>
                <br />
                <label>
                    Jelszó:
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e, 'password')}
                    />
                </label>
                <br />
                <label>
                    Jelszó megerősítése:
                    <input
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={(e) => handleChange(e, 'passwordConfirm')}
                    />
                </label>
                <br />
                <label>
                    Vezetéknév:
                    <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => handleChange(e, 'lastname')}
                    />
                </label>
                <br />
                <label>
                    Keresztnév:
                    <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) => handleChange(e, 'firstname')}
                    />
                </label>
                <br />
                <label>
                    Szállítási cím név:
                    <input
                        type="text"
                        value={formData.shippingAddress.name}
                        onChange={(e) => handleChange(e, 'shippingAddress')}
                    />
                </label>
                <br />
                <label>
                    Ország:
                    <input
                        type="text"
                        value={formData.shippingAddress.country}
                        onChange={(e) => handleChange(e, 'country')}
                    />
                </label>
                <br />
                <label>
                    Város:
                    <input
                        type="text"
                        value={formData.shippingAddress.city}
                        onChange={(e) => handleChange(e, 'city')}
                    />
                </label>
                <br />
                <label>
                    Utca, házszám:
                    <input
                        type="text"
                        value={formData.shippingAddress.street}
                        onChange={(e) => handleChange(e, 'street')}
                    />
                </label>
                <br />
                <label>
                    Irányítószám:
                    <input
                        type="text"
                        value={formData.shippingAddress.zip}
                        onChange={(e) => handleChange(e, 'zip')}
                    />
                </label>
                <br />
                <label>
                    Telefonszám:
                    <input
                        type="text"
                        value={formData.shippingAddress.phoneNumber}
                        onChange={(e) => handleChange(e, 'phoneNumber')}
                    />
                </label>
                <br />
                <button type="submit">Regisztráció</button>
                <button type="button" onClick={handleCancel}>Mégsem</button>
            </form>
        </div>
    );
}

export default Registration;
