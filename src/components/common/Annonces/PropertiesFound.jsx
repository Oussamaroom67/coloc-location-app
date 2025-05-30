import "../../../assets/styles/styleAnnonces.css"
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import { MapPin,SlidersHorizontal  } from 'lucide-react';
import { useState,useEffect } from "react";
const properties = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  title: `Modern Studio ${i + 1}`,
  price: 750 + i * 10,
  image: "../../../public/Room.jfif",
  address: `456 College St, Downtown`,
  type: "Studio",
  bedrooms: 1,
  bathrooms: 1,
}));
const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 1000,
      label: '$1,000',
    },
    {
      value: 3000,
      label: '$3,000+',
    }
];
const CustomSlider = styled(Slider)({
  color: '#ff6b5c', // couleur du slider principal (track + thumb)
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#ff6b5c',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#f0f0f0',
    opacity: 1,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #ff6b5c',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: '0px 0px 0px 8px rgba(255, 107, 92, 0.16)',
    },
  },
  '& .MuiSlider-markLabel': {
    color: 'black',
    fontWeight: 'bold',
  }
});
function valuetext(value) {
    return `$${value}`;
}
export default function PropertiesFound(){
    // states
    const [Bedrooms, setBedrooms] = useState('Any');
    const [Bathrooms, setBathrooms] = useState('Any');
    const [priceRange,setPriceRange] = useState(1000);
    const [propertyType,setPropertyType]=useState(['Apartment']);
    const [amenities,setAmenities]=useState(['Parking']);
    const [sort, setSort] = useState("Newest");
    const [page, setPage] = useState(1);
    const [openFilter,setOpenFilter]=useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    //choices
    const propertiesPerPage = 6;
    const propertyTypes = ['Apartment', 'House', 'Room', 'Studio'];
    const amenitiesList = ['Parking','Laundry','Pet Friendly','WiFi included']
    //handlers
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
    
      window.addEventListener("resize", handleResize);
    
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
      document.body.style.overflow = openFilter ? "hidden" : "auto";
    }, [openFilter]);
    const handleType = (event) => {
      const { value, checked } = event.target;
  
      if (checked) {
        setPropertyType((prev) => [...prev, value]);
      } else {
        setPropertyType((prev) => prev.filter((type) => type !== value));
      }
    };
    const handleAmenities = (event) => {
      const { value, checked } = event.target;
  
      if (checked) {
        setAmenities((prev) => [...prev, value]);
      } else {
        setAmenities((prev) => prev.filter((type) => type !== value));
      }
    };
    const handleBedrooms = (event, bedrooms) => {
      setBedrooms(bedrooms);
    };
    const handleBathrooms = (event, bathrooms) => {
      setBathrooms(bathrooms);
    };
    const handlePriceRange = (event)=>{
      setPriceRange(event.target.value);
    }
    const handleSort = (event) => {
      setSort(event.target.value);
    };
    const handleChangePage = (event, value) => {
      setPage(value);
    };
    const handleOpenFilter = ()=>{
      setOpenFilter((prev) => !prev);
    }
    // indexes
    const startIndex = (page - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const currentProperties = properties.slice(startIndex, endIndex);
    return(
        <div className="PropertiesFoundContainer">
            <div className="btnFilter" onClick={handleOpenFilter}>
              <SlidersHorizontal size={"15px"}/>
              <button className="buttonFilter" >Filters</button>
            </div>
            {/* Overlay */}
            {openFilter && isMobile && (
              <div className="overlay" onClick={handleOpenFilter}></div>
            )}
            <div className="filter"
            style={{
              display: isMobile ? (openFilter ? "flex" : "none") : "flex",
              zIndex: 1001, 
            }}
              >
                <div className="titleFilter">Filters</div>
                <div style={{width:"100%",display:"flex",alignItems:"start",flexDirection:"column",gap:"9px"}}>
                  <label htmlFor="Slider">Price Range</label>
                  <CustomSlider
                    aria-label="Price Range"
                    defaultValue={priceRange}
                    min={0}
                    max={4000}
                    getAriaValueText={valuetext}
                    step={5}
                    valueLabelDisplay="auto"
                    marks={marks}
                    value={priceRange}
                    onChange={handlePriceRange}
                  />
                </div>
                <div style={{width:"100%",display:"flex",alignItems:"start",flexDirection:"column",gap:"9px"}}>
                  <label htmlFor="">Property Type</label>
                  <FormGroup>
                    {propertyTypes.map((type) => (
                      <FormControlLabel
                        key={type}
                        control={
                          <Checkbox
                            value={type}
                            checked={propertyType.includes(type)}
                            onChange={handleType}
                            icon={<PanoramaFishEyeIcon />}
                            checkedIcon={<TaskAltIcon />}
                            sx={{
                              color: "#ef5350",
                              '&.Mui-checked': {
                                color: "#ef5350",
                              },
                            }}
                          />
                        }
                        label={type}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div style={{width:"100%",display:"flex",alignItems:"start",flexDirection:"column",gap:"13px"}}>
                  <label htmlFor="">Bedrooms</label>
                  <ToggleButtonGroup
                    value={Bedrooms}
                    exclusive
                    onChange={handleBedrooms}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="0" aria-label="any" sx={{textTransform:"none !important"}}>
                      Any
                    </ToggleButton>
                    <ToggleButton value="1" aria-label="1" >
                      1
                    </ToggleButton>
                    <ToggleButton value="2" aria-label="2">
                      2
                    </ToggleButton>
                    <ToggleButton value="3" aria-label="3">
                      3
                    </ToggleButton>
                    <ToggleButton value="4+" aria-label="4+">
                      4+
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div style={{width:"100%",display:"flex",alignItems:"start",flexDirection:"column",gap:"13px"}}>
                  <label htmlFor="">Bathrooms</label>
                  <ToggleButtonGroup
                    value={Bathrooms}
                    exclusive
                    onChange={handleBathrooms}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="0" aria-label="0" sx={{textTransform:"none !important"}}>
                      Any
                    </ToggleButton>
                    <ToggleButton value="1" aria-label="1">
                      1
                    </ToggleButton>
                    <ToggleButton value="1.5" aria-label="1.5">
                      1.5
                    </ToggleButton>
                    <ToggleButton value="2" aria-label="2">
                      2
                    </ToggleButton>
                    <ToggleButton value="2+" aria-label="2+">
                      2+
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div style={{width:"100%",display:"flex",alignItems:"start",flexDirection:"column",gap:"13px"}}>
                  <label htmlFor="">Amenities</label>
                  <FormGroup>
                    {amenitiesList.map((type) => (
                      <FormControlLabel
                        key={type}
                        control={
                          <Checkbox
                            value={type}
                            checked={amenities.includes(type)}
                            onChange={handleAmenities}
                            icon={<PanoramaFishEyeIcon />}
                            checkedIcon={<TaskAltIcon />}
                            sx={{
                              color: "#ef5350",
                              '&.Mui-checked': {
                                color: "#ef5350",
                              },
                            }}
                          />
                        }
                        label={type}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
                  <Button variant="contained" className="searchButton" style={{width:"200px"}}>Apply Filter</Button>
                </div>
            </div>
            <div className="resultats">
                <div className="top">
                  <div  className="titlePropFound" style={{fontSize:"23px"}}>742 Properties Found</div>
                  <FormControl className="formControll" fullWidth style={{width:"190px"}}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Age"
                      onChange={handleSort}
                    >
                      <MenuItem value={"Newest"}>Newest</MenuItem>
                      <MenuItem value={"Low to High"}>Price: Low to High</MenuItem>
                      <MenuItem value={"High to Low"}>Price: High to Low</MenuItem>
                      <MenuItem value={"Most Popular"}>Most Popular</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="cardsResultats">
                {currentProperties.map((property) => (
                  <div className="cardResultat" key={property.id}>
                    <div className="containerPic">
                      <img src={property.image} alt="" />
                      <div className="heartTopRight">
                        <Checkbox  icon={<FavoriteBorder color="#fe7364" />} checkedIcon={<Favorite color="#fe7364"/>} />
                      </div>
                      <div className="typeTopLeft">{property.type}</div>
                    </div>
                    <div className="infoSectionn">
                      <div className="descrbAndPrice">
                        <div className="describ">{property.title}</div>
                        <div className="Pprice">
                          <span style={{fontSize:"20px",fontWeight:"700"}}>${property.price}/</span>
                          <span style={{fontSize:"18px",fontWeight:"700"}}>mo</span>
                        </div>
                      </div>
                      <div className="address">
                        <MapPin size={"15px"}/>
                        <div style={{fontSize:"16px"}}>{property.address}</div>
                      </div>
                      <div className="infoSupp">
                        <div className="bedsAndBaths">
                          <span style={{fontSize:"16px",fontWeight:"500"}}>{property.bedrooms} Beds</span>
                          <span style={{ fontSize: '18px', lineHeight: '0' }}>•</span>
                          <span style={{fontSize:"16px",fontWeight:"500"}}>{property.bathrooms} Baths</span>
                        </div>
                        <div className="availability">Available Now</div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
                <div  className="pagination" style={{display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination
                  count={Math.ceil(properties.length / propertiesPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    '& .MuiPaginationItem-root': {
                      color: 'black',
                      borderColor: '#fe7364',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#fe7364',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#e65b51',
                      },
                    }
                  }}
                />
                </div>
            </div>
        </div>
    );
}