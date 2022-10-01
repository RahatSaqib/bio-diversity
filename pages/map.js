import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "../components/Home/Footer/Footer";
import { margin } from "@mui/system";
import Counters from "../components/Home/counters";
import { CityPin } from "../utils/city-pin";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router'
mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapGL, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
} from "react-map-gl";


const imageSrc = require("../assets/images/species1.jpg");
const map = require("../assets/images/map.png");
const fullscreenControlStyle = {
    position: "relative",
    top: 0,
    left: 0,
    padding: "10px"
};

const navStyle = {
    position: "absolute",
    top: 36,
    left: 0,
    padding: "10px"
};
let imageProps = {
    height: "300px",
    width: "400px",
}
const settings = {
    customPaging: function (i) {
        return (
            <a>
                <Image src={`${imageUrl + '/' + speciesData.additionalFiles[i]}`} />
            </a>
        );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const myLoader = ({ src }) => `${src}`
const Map = () => {
    const router = useRouter()
    const [query, setQuery] = useState(router.query)
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(15);
    const [lng, setLng] = useState()
    const [lat, setLat] = useState()
    const [speciesData, setSpeciesData] = useState({})
    const [popupInfo, setPopUpInfo] = useState(null)
    const fetchData = async (query, cbfn) => {
        let searchParameters = query
        let response = await callApi("/get-species-by-serial", { searchParameters })
        if (response?.data?.length > 0) {
            setSpeciesData(response.data[0])
            cbfn(response.data[0])
        }
        else {
            cbfn({})
        }
    }
    useEffect(() => {
        if (!query) return; // initialize map only once
        fetchData(query, (speciesData) => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: process.env.mapStyle,
                center: [speciesData.lng, speciesData.lat],
                zoom: zoom
            });
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
            const el = document.createElement('div');
            const width = 50;
            const height = 50;
            el.className = styles.marker;
            el.style.backgroundImage = `url('${speciesData.marker}')`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.top = `-15px`;
            el.style.backgroundSize = '100%';
            new mapboxgl.Marker(el)
                .setLngLat([speciesData.lng, speciesData.lat])
                .addTo(map.current);
        })


    }, [query]);

    const _renderPopup = () => {

        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() => setPopUpInfo(null)}
                >
                    {/* <CityInfo info={popupInfo} /> */}
                </Popup>
            )
        );
    }
    return (


        <Box
            component="main"
            sx={{
                flexGrow: 1,

            }}
        >
            <Grid
                container
                spacing={3}
                xs={12}
                md={12}

            >
                <Grid
                    item
                    md={12}
                    xl={12}
                    xs={12}
                    style={{ borderRadius: "10px" }}
                // style={{  paddingRight: "20px" }}
                >
                    <div className={styles.sidebar}>
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                    <div className={styles.details_bar}>

                        <Card sx={{ maxWidth: 345, height: 1080 }}>
                            {speciesData?.additionalFiles?.length > 0 ?
                                speciesData.additionalFiles.map((speciesImage, index) => {
                                    return (
                                        <div>
                                            <Slider {...settings}>

                                                <div>
                                                    <Image {...imageProps} loader={myLoader} src={imageUrl + '/'+ speciesImage} />
                                                </div>

                                            </Slider>
                                        </div>)
                                }) : null
                                // <Image src={imageUrl + '/'+ speciesData?.profile_image} alt="species-image" width="345" height={200}></Image>
                            }

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {query?.Species}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {query?.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                    </div>
                    <div ref={mapContainer} className={styles.map_container}></div>

                </Grid>

            </Grid>

            {/*  */}
        </Box>






    );
};
Map.getInitialProps = ({ query }) => {
    return { query }
}
export default Map;
