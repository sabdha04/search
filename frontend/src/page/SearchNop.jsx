import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css'

function SearchNop() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async (searchTerm) => {
    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { search: searchTerm },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Gagal mengambil data');
    }
  };

  useEffect(() => {
    if (search) {
      fetchData(search);
    } else {
      setData([]); //if empty
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(search); // Fetch data on form submit
  };

  const handleUpdBukaRetur = async (row) => {
    const updateData = {
      blnbyr: row.BLNBYR,
      jnsbyr: row.JNSBYR,
      nopens: row.NOPENS,
      tgl_trn2: '19450817',
    };

    try {
      await axios.put('http://localhost:5000/api/upd_bukaretur', updateData);
      fetchData(search);
    } catch (err) {
      console.error('Error update data:', err);
      setError('Gagal mengupdate data');
    }
  };

  const handleUpdRetur = async (row) => {
    const updateData = {
      blnbyr: row.BLNBYR,
      jnsbyr: row.JNSBYR,
      nopens: row.NOPENS,
      tgl_trn2: null,
    };

    try {
      await axios.put('http://localhost:5000/api/upd_retur', updateData);
      fetchData(search);
    } catch (err) {
      console.error('Error update data:', err);
      setError('Gagal mengupdate data');
    }
  };

  return (
    <div className='wrap'>
      <form onSubmit={handleSearch} className='search-box'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari NOPENS"
          className='form-control'
        />
      </form>

      {error && <p>{error}</p>}
      <div className='container'>
        <div className='table-responsive'>
          <table className='table'>
            <thead className="thead-light">
              <tr >
                <th scope="col" className='has-text-white'>BLNBYR</th>
                <th scope="col" className='has-text-white'>JNSBYR</th>
                <th scope="col" className='has-text-white'>JNSBYR_DESC</th>
                <th scope="col" className='has-text-white'>NOPENS</th>
                <th scope="col" className='has-text-white'>NAMA</th>
                <th scope="col" className='has-text-white'>TGL_TRN2</th>
                <th scope="col" className='has-text-white'>AKSI</th>
              </tr>
            </thead>
            <tbody id='tbody-box'>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.BLNBYR}</td>
                  <td>{row.JNSBYR}</td>
                  <td>{row.JNSBYR_DESC}</td>
                  <td>{row.NOPENS}</td>
                  <td>{row.NAMA}</td>
                  <td>{row.TGL_TRN2}</td>
                  <td>
                    {row.TGL_TRN2 ? (
                      <button
                        className='btn btn-aksi btn-sm' onClick={() => handleUpdRetur(row)}
                      >Retur</button>
                    ) : (
                      <button
                        className='btn btn-aksi btn-sm' onClick={() => handleUpdBukaRetur(row)}
                      >Buka Retur</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SearchNop;
