import * as React from 'react';
import { MapPin,House,Flag,Info,Calendar,Heart,User,Bath,Grid2x2Plus} from 'lucide-react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function InformationAnnonces(){
    // states
    const [value, setValue] = React.useState(0);
    const [openSignal,setOpenSignal] = React.useState(false);

    // handlers
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleOpenSignal = ()=>{
        setOpenSignal(true);
    }
    const handleCloseSignal = ()=>{
        setOpenSignal(false);
    }

    React.useEffect(()=>{
        document.body.style.overflow = openSignal ? "hidden" : "auto";

    },[openSignal])

    const typesApp = [
        {icn:House,title:"Type",value:"Apartment"},
        {icn:User,title:"Bedrooms",value:"2"},
        {icn:Bath,title:"Bathrooms",value:"1"},
        {icn:Grid2x2Plus,title:"Area",value:"850 sq ft"}
    ]
    return(
        <div className='infoAnnoncesContainer'>
            {/* Overlay */}
            {openSignal && (
                <div className="overlay" onClick={handleCloseSignal}></div>
            )}
            <div className="cardSignal" style={{display: openSignal?"flex":"none"}}>
                <div className="topCard">
                    <div className='titleCardSignal'>Signaler cette propriété</div>
                    <div className='discreptionCardSignal'>Veuillez nous indiquer pourquoi vous souhaitez signaler Spacious 2-Bedroom Apartment Near Campus. Votre signalement sera examiné par notre équipe.</div>
                </div>
                <FormControl sx={{display:"flex",gap:"8px"}}>
                                <div className='rsnSignal'>Raison du signalement</div>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel  value="Frauduleux" control={<Radio />} label="Contenu frauduleux ou trompeur" />
                                    <FormControlLabel value="inapproprié" control={<Radio />} label="Contenu inapproprié" />
                                    <FormControlLabel value="spam" control={<Radio />} label="Spam ou publicité" />
                                    <FormControlLabel value="abusif" control={<Radio />} label="Harcèlement ou comportement abusif" />
                                    <FormControlLabel value="other" control={<Radio />} label="Autre raison" />
                                </RadioGroup>
                </FormControl>
                <div className="areaSignal">
                                <label htmlFor="" className='titleArea'>Détails supplémentaires</label>
                                <textarea className='areaText' style={{border:"2px solid #e0e0e0",borderRadius:"12px",padding:"12px",fontSize:"12px",height:"80px"}} type="text" placeholder='veuillez fournir plus de details sur votre signalement...' />
                </div>
                <div className="btnSignal">
                    <Button onClick={handleCloseSignal} variant="outlined" sx={{color:"black",borderColor:"#9e9e9e",textTransform:"none"}}>Annuler</Button>
                    <Button variant="contained" style={{backgroundColor:"#ff6b5c",width:"170px",textTransform:"none"}} >Envoyer le signalement</Button>
                </div>
            </div>
            <div className="infoAnnonces">
                <div className="topInfo">
                    <div className="nameAppartment">Spacious 2-Bedroom Apartment Near Campus</div>
                    <div className="priceAppartment">
                        <div className="prcAppartment">$1200/mo</div>
                        <div className="available">Available from August 1, 2025</div>
                    </div>
                </div>
                <div className="bodyAppartment">
                        <div className="adressApartment">
                            < MapPin className='iconInfo'/>
                            <div style={{fontWeight: "500"}}>456 College St, Downtown</div>
                        </div>
                        <div className="caracAppartment">
                            {
                                typesApp.map((type)=>{
                                    return(
                                        <div className="typeApp">
                                            <div className="icnTypeApp">
                                                <type.icn color="#757575" size="18px"/>
                                            </div>
                                            <div className="valueTypeApp">
                                                <div style={{fontSize:"13px",color:"#757575"}}>{type.title}</div>
                                                <div>{type.value}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <Box sx={{ width: '100%' }} className="BoxInfoAappartment">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Description" {...a11yProps(0)} />
                                <Tab label="Amenities" {...a11yProps(1)} />
                                <Tab label="Location" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                This beautiful 2-bedroom apartment is perfect for students looking for a comfortable living space near campus. The apartment features a spacious living room, fully equipped kitchen, and two bedrooms with ample storage space. Located just 5 minutes from the university, this property offers convenience and comfort.
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <ul className='listAmenities'>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Fully Furnished</div>
                                    </li>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Air Conditioning</div>
                                    </li>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Parking Available</div>
                                    </li>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>High-Speed Internet</div>
                                    </li>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Laundry Facilities</div>
                                    </li>
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Security System</div>
                                    </li>
                                </ul>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                Located in a prime area just 5 minutes walking distance from the university campus. Nearby amenities include grocery stores, cafes, restaurants, and public transportation.
                            </CustomTabPanel>
                        </Box>
                        <div className="buttonsBodyAppartment">
                            <div className="buttonBodyAppartment">
                                <Heart size="14px"/>
                                <div>Save</div>
                            </div>
                            <div className="buttonBodyAppartment">
                                <ShareIcon sx={{fontSize:"14px"}}/>
                                <div>Share</div>
                            </div>
                            <div className="buttonBodyAppartment" onClick={handleOpenSignal}>
                                <Flag size="14px"/>
                                <div>Signaler</div>
                            </div>
                        </div>
                    
                </div>
            </div>
            <div className="infoPropCard">
                <div className="topInfoCard">
                    <div className="pdpProp">
                        <img  style={{width:"100%",height:"100%"}} src="/ProfilPicture.jfif" alt="" />
                        
                    </div>
                    <div className="cordonneesProp">
                        <div className="nameProp">
                            <div style={{fontSize: "14px",color:"black",fontWeight:"700"}}>John Smith</div>
                            <Flag  className='iconInfo'/>
                        </div>
                        <div className="evaluationProp">
                            <StarIcon sx={{fontSize:"18px",color:"#ffa000"}}/>
                            <div style={{fontSize: "12px"}}>4.8 (24 reviews)</div>
                        </div>
                    </div>
                </div>
                <div className="respondDelai">
                    <Info className='iconInfo'/>
                    <div style={{fontSize: "13px"}}>Usually responds within 1 hour</div>
                </div>
                <div className="availableProp">
                    <Calendar className='iconInfo'/>
                    <div style={{fontSize: "13px"}}>Available from August 1, 2025</div>
                </div>
                <div className="btnContactContainer" style={{display:"flex",justifyContent:"center",width:"100%"}}>
                    <div className="cntctBtn">
                        <Flag  style={{color:"white",width:"15px"}} />
                        <button style={{fontSize:"13px",color:"white"}}>Contact Owner</button>
                    </div>
                </div>
                <div style={{textAlign:"center",fontSize:"11px",color:"#757575"}}>You must be logged in as a student to contact property owners</div>
            </div>
        </div>
    );
}