import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/RSVP.css'
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Banner from '../components/Banner';

const RSVP = () => {

    const[response, setResponse] = useState(false)
    const[displayForm,setDisplayForm ] = useState("")


    //my form fields
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        guests: '',
        song: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const snapshot = await getDocs(collection(db, 'rsvps'));
    //         console.log('✅ Firestore is working. Docs:', snapshot.size);
    //         snapshot.forEach(doc => {
    //           console.log(doc.id, '=>', doc.data());
    //         });
    //       } catch (error) {
    //         console.error('❌ Error fetching RSVPs:', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

    //for handling input changes
    const handleChange =(e) =>{
        const {id,  value} = e.target;
        setFormData((prev)=> ({
            ...prev,
            [id]: value
        }))
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setDisplayForm("none")
        setResponse(true)
        setError('');
        try{
            await addDoc(collection(db, 'rsvps'), {
                ...formData,
                guests: parseInt(formData.guests, 10),
                timestamp: new Date()
              });
              setSubmitted(true);
              setFormData({ name: '', attendance: '', guests: '', song: '' });
        }
        catch(err){
            setError('Failed to send RSVP. Try again.')
            console.error(err);
        }
    }

  return (
    <div className='RSVPFormParentDiv'>

        <Banner />
        {/* <img className='rsvpBanner' src='/images/floralBackground1.webp' alt='RSVP Banner' /> */}

        <Header>RSVP</Header>
        {/* <h1 className='heading'>RSVP</h1> */}

        {/* <button className='adminButton'>  */}
            <Link to={`/signin`}>
                <button className='adminButton'>
                    Login As Admin
                </button>
            </Link> 
        {/* </button> */}

        <hr className='sectionDivider' />
        <h3>RSVP for Wedding Event</h3>
        <hr className='sectionDivider hr'/>


        <div className='RSVPForm' style={{ display: displayForm}} >
                
                <form className='mainRSVPForm' onSubmit={handleSubmit} >
                    
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <br></br>
                        <input type='text' id='name' required onChange={handleChange} value={formData.name} placeholder='Name' />
                    </div>


                    <div>
                        <label htmlFor='attendance'>Confirmation of Attendance</label>
                        <br></br>

                        <select id="attendance" name="attendance" onChange={handleChange} required value={formData.attendance} placeholder='Attendance'>
                            <option value="" disabled hidden>Select one</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>



                    <div>
                        <label htmlFor='guests'>Number of Guests: </label>
                        <br></br>

                        <input type='number' id='guests' required onChange={handleChange} value={formData.guests} placeholder='Guests' />
                    </div>



                    <div>
                        <label htmlFor='song'>I will dance when I hear..</label>
                        <br></br>

                        <input type='text' id='song' required onChange={handleChange} value={formData.song} placeholder='Song' />
                    </div>



                    <button className='submitBtn' type='submit' >Reply Now</button>
                </form>

        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* THANK YOU DIV */}
        <div className={ response ? 'showResponse' : 'hideResponse' }>
            <p>Thank you</p>
            <p>Your response has been submitted</p>
        </div>
</div>
  )
}

export default RSVP
