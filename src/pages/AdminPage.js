import React, {useEffect, useState} from 'react'
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db ,auth } from "../firebase";
import useAuth from "../hooks/useAuth"; 
import { collection, getDocs } from 'firebase/firestore';
import '../styles/Admin.css'


const AdminPage = () => {

    const {user, loading} = useAuth();

    const [rsvps, setRsvps] = useState([]);

    const[filteredRsvps, setFilteredRsvps] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [error, setError] = useState("");

    const[numberOfGuests, setNumberOfGuests] = useState(0)

    const handleLogOut = async (e) =>{
        try{
            await signOut(auth);
            console.log("User logged out successfully!");
        }
        catch(err){
            console.error("Error Logging out: ", err)
        }
    }

    useEffect(() => {
        // Fetch RSVPs when the component mounts
        const fetchRSVPs = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "rsvps"));
            const rsvpData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setRsvps(rsvpData);
            setFilteredRsvps(rsvpData);
          } catch (error) {
            console.error("Error fetching RSVPs:", error);
          }
        };
    
        fetchRSVPs();
      }, []);

      useEffect(() => {
        let no = 0;
        rsvps.forEach((rsvp) => {
          if (rsvp.attendance === "yes") {
            no++;
          }
          no = no + rsvp.guests
        });
        setNumberOfGuests(no);
      }, [rsvps]);
      

      const handleSearch = (e) =>{
        const query = e.target.value.toLowerCase();
        console.log(query)
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredRsvps(rsvps);
            setError("");
            return;
        }

        const results = rsvps.filter((rsvp) => {
            return (
              rsvp.name.toLowerCase().includes(query) ||
              rsvp.attendance.toLowerCase().includes(query) ||
              (rsvp.guests == query)   ||
              rsvp.song.toLowerCase().includes(query)
            );
          });


          if (results.length > 0) {
            setFilteredRsvps(results);
            // setRsvps(filteredRsvps)
            setError("");
          } else {
            setFilteredRsvps([]);
            // setRsvps(filteredRsvps)

            setError("No books found matching your search.");
          }

      }

      const handleFilter = (e) =>{
        const query = e.target.value.toLowerCase();

        const results = rsvps.filter((rsvp) => {
            return(
                rsvp.attendance.toLowerCase() === query
            )
        })
        if (results.length > 0) {
            setFilteredRsvps(results);
            // setRsvps(filteredRsvps)
            setError("");
          } 
          else if ( results.length === 0 && query === "all"){
            setFilteredRsvps(rsvps);
            // setRsvps(filteredRsvps)
            setError("");
          }
          else {
            setFilteredRsvps([]);
            // setRsvps(filteredRsvps)

            setError("No books found matching your search.");
          }
      }

    if(loading) return <p>Loading....</p>

  return user ? (
    <div className='adminPage'>
        <button className='logOutBtn' onClick={handleLogOut}>Log Out</button>

        <h1>Admin Page</h1>

        <div className='searchDiv'>
            <input type='text' onChange={handleSearch} value={searchQuery} placeholder='Search Guests by name, attendance, song..' />
        </div>

        <p className='attendance'>Attendance: </p>

        <div className='radioDiv'>
          <input type='radio' id='yes' value='Yes' name='attendance' onChange={handleFilter} className="radio-input firstRadio" />
          <label htmlFor='yes' class="radio-label" >Yes</label>

          <input type='radio' id='no' value='No' name='attendance' onChange={handleFilter} className="radio-input" />
          <label htmlFor='no' class="radio-label" >No</label>

          <input type='radio' id='all' value='All' name='attendance' onChange={handleFilter} className="radio-input" />
          <label htmlFor='all' class="radio-label" >All</label>
        </div>


        <p>Your total number of Guests is <span>{numberOfGuests}</span> </p>

        <hr></hr>
        <h3>RSVP For Wedding</h3>
        <hr></hr>

        {
            rsvps.length === 0 ? 
            (
                <p>No RSVPs yet.</p>
            )
            :
            (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Confirmation of Attendance</th>
                            <th>Number of Guests</th>
                            <th>Song(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRsvps.map((rsvp) => (
                            <tr key={rsvp.name}>
                                <td>{rsvp.name}</td>
                                <td>{rsvp.attendance}</td>
                                <td>{rsvp.guests}</td>
                                <td>{rsvp.song}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }


    </div>
    )
    : (
        <Navigate to='/signin' />
    )
    
}

export default AdminPage