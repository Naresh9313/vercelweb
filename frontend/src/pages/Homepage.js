import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Homepage() {
  const { user, token } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const handleGet = async () => {
    try {
      const url = `https://nareshprajapati9313.onrender.com/event/getEvent?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setEvents(data.event || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, [search, category, sort, page]);

  const handleBooking = async (eventId) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const res = await fetch(
      `https://nareshprajapati9313.onrender.com/booking/eventBooking?userId=${user}&eventId=${eventId}&tickets=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.ok) alert("Booking success!");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h1 className="text-center fw-bold mb-5">Available Events</h1>

        <div
          className="p-3 mb-4 rounded shadow-sm"
          style={{ background: "#f8f9fa" }}
        >
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Search events..."
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={category}
                onChange={(e) => {
                  setPage(1);
                  setCategory(e.target.value);
                }}
              >
                <option value="">All Categories</option>
                <option value="Music">Music</option>
                <option value="Garba">Garba</option>
                <option value="Education">Education</option>
                <option value="Party">Party</option>
                <option value="BGMI(pubg)">BGMI(pubg)</option>
                <option value="Game Event">Game Event</option>
                <option value="Party">Party</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={sort}
                onChange={(e) => {
                  setPage(1);
                  setSort(e.target.value);
                }}
              >
                <option value="">Sort by Date</option>
                <option value="date_asc">Old → New</option>
                <option value="date_desc">New → Old</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {events.map((item) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card p-2 shadow">
                <h5>{item.ename}</h5>
                <p>
                  <b>Date:</b> {item.edate}
                </p>
                <p>
                  <b>Category:</b> {item.category}
                </p>
                <p>
                  <b>Venue:</b> {item.evenues}
                </p>
                <p>
                  <b>Location:</b> {item.elocation}
                </p>
                <p>
                  <b>Price:</b> ₹{item.eprice}
                </p>

                <button
                  className="btn btn-success w-100"
                  onClick={() => handleBooking(item._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <button
            className="btn btn-outline-primary me-3"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="fw-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary ms-3"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
