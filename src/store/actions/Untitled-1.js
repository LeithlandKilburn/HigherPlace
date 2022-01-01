{
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST RACE. JUST RACE. JUST RACE. JUST RACE. JUST RACE.  JUST RACE.  JUST RACE. JUST RACE. JUST RACE. JUST RACE. JUST RACE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm).get().then((snapshot) => {
        console.log(snapshot);
        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST RACE & REGION. JUST RACE & REGION. JUST RACE & REGION. JUST RACE & REGION. JUST RACE & REGION. JUST RACE & REGION.  
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST RACE & REGION & COUNTRY. JUST RACE & REGION & COUNTRY. JUST RACE & REGION & COUNTRY. JUST RACE & REGION & COUNTRY.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST RELIGION. JUST RELIGION. JUST RELIGION. JUST RELIGION. JUST RELIGION. JUST RELIGION. JUST RELIGION. JUST RELIGION.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.StyleTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("styles", "array-contains", searchObject.StyleTerm).get().then((snapshot) => {
                console.log(snapshot);

                snapshot.docs.forEach(doc =>  {
                    let tempArtist = doc.data();
                    filteredArtists = [...filteredArtists, tempArtist];
                })

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("profession", "array-contains", searchObject.ArtistryTerm).get().then((snapshot) => {
                console.log(snapshot);

                snapshot.docs.forEach(doc =>  {
                    let tempArtist = doc.data();
                    filteredArtists = [...filteredArtists, tempArtist];
                })

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE. JUST LANGUAGE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT. JUST LGBT.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
        
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & RELIGION. RACE & RELIGION. RACE & RELIGION. RACE & RELIGION. RACE & RELIGION. RACE & RELIGION. RACE & RELIGION.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & RELIGION. RACE & REGION & RELIGION. RACE & REGION & RELIGION. RACE & REGION & RELIGION. RACE & REGION & RELIGION.  
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & RELIGION. RACE & REGION & COUNTRY & RELIGION. RACE & REGION & COUNTRY & RELIGION.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & LANGUAGE. RACE & LANGUAGE. RACE & LANGUAGE. RACE & LANGUAGE. RACE & LANGUAGE. RACE & LANGUAGE. RACE & LANGUAGE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
        console.log(snapshot);
        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));
        console.log(tempArtists);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            console.log("NOT FILTEREDD")
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & LANGUAGE. RACE & REGION & LANGUAGE. RACE & REGION & LANGUAGE. RACE & REGION & LANGUAGE. RACE & REGION & LANGUAGE.  
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
        console.log(snapshot);
        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & LANGUAGE. RACE & REGION & COUNTRY & LANGUAGE. RACE & REGION & COUNTRY & LANGUAGE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
        console.log(snapshot);
        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. RACE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & LGBTQ. RACE & REGION & LGBTQ. RACE & REGION & LGBTQ. RACE & REGION & LGBTQ. RACE & REGION & LGBTQ.   
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & LGBTQ. RACE & REGION & COUNTRY & LGBTQ. RACE & REGION & COUNTRY & LGBTQ. RACE & REGION & COUNTRY & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RELIGION & LANGUAGE. RELIGION & LANGUAGE. RELIGION & LANGUAGE. RELIGION & LANGUAGE. RELIGION & LANGUAGE. RELIGION & LANGUAGE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.ReligionTerm)
            .where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
        console.log(snapshot);

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RELIGION & LGBTQ. RELIGION & LGBTQ. RELIGION & LGBTQ. RELIGION & LGBTQ. RELIGION & LGBTQ. RELIGION & LGBTQ. RELIGION & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.StyleTerm)
        {
            if (searchObject.AffinityTerm.SexualityTerm)
            {
                db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                    .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).where("style", "array-contains", searchObject.StyleTerm)
                    .get().then((snapshot) => {
                    console.log(snapshot);
    
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
    
                    console.log("Filtering Artists for Home Page", tempArtists);
                    dispatch({type: "FILTER_ARTISTS", filteredArtists});
    
                    }).catch((err) => {
                
                        //Activate the reducer.
                        dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                    })
            } else
            {
                db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                    .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).where("style", "array-contains", searchObject.StyleTerm)
                    .get().then((snapshot) => {
                    console.log(snapshot);
    
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
    
                    console.log("Filtering Artists for Home Page", searchObject);
                    dispatch({type: "FILTER_ARTISTS", filteredArtists});
    
                    }).catch((err) => {
                
                        //Activate the reducer.
                        dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                    })
            }
        } else
        {
            if (searchObject.AffinityTerm.SexualityTerm)
            {
                db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                    .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).where("profession", "array-contains", searchObject.ArtistryTerm)
                    .get().then((snapshot) => {
                    console.log(snapshot);
    
                    let docArtist;
                    snapshot.docs.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
    
                    console.log("Filtering Artists for Home Page", docArtist);
                    dispatch({type: "FILTER_ARTISTS", filteredArtists});
    
                    }).catch((err) => {
                
                        //Activate the reducer.
                        dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                    })
            } else
            {
                db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                    .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).where("profession", "array-contains", searchObject.ArtistryTerm)
                    .get().then((snapshot) => {
                    console.log(snapshot);
    
                    let docArtist;
                    snapshot.docs.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
    
                    console.log("Filtering Artists for Home Page", searchObject);
                    dispatch({type: "FILTER_ARTISTS", filteredArtists});
    
                    }).catch((err) => {
                
                        //Activate the reducer.
                        dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                    })
            }
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --LANGUAGE & LGBTQ. LANGUAGE & LGBTQ. LANGUAGE & LGBTQ. LANGUAGE & LGBTQ. LANGUAGE & LGBTQ. LANGUAGE & LGBTQ. LANGUAGE & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
            .where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & RELIGION & LANGUAGE. RACE & RELIGION & LANGUAGE. RACE & RELIGION & LANGUAGE. RACE & RELIGION & LANGUAGE.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & RELIGION & LANGUAGE. RACE & REGION & RELIGION & LANGUAGE. RACE & REGION & RELIGION & LANGUAGE. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & RELIGION & LANGUAGE. RACE & REGION & COUNTRY & RELIGION & LANGUAGE. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && !(searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
            .where("religion", "==", searchObject.AffinityTerm.ReligionTerm).get().then((snapshot) => {
        console.log(snapshot);

        //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
        let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

        if (searchObject.StyleTerm)
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
            let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists3.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        } else
        {
            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
            let docArtist;
            tempArtists2.forEach(doc =>  {
                docArtist = doc.data();
                filteredArtists = [...filteredArtists, docArtist];
            })
        }

        console.log("Filtering Artists for Home Page", searchObject);
        dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RELIGION & LANGUAGE & LGBTQ. RELIGION & LANGUAGE & LGBTQ. RELIGION & LANGUAGE & LGBTQ. RELIGION & LANGUAGE & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (!searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                    .where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                    .where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm).get().then((snapshot) => {  
                console.log(snapshot);

                if (searchObject.StyleTerm)
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                    let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists2.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                } else
                {
                    //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                    let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                    let docArtist;
                    tempArtists.forEach(doc =>  {
                        docArtist = doc.data();
                        filteredArtists = [...filteredArtists, docArtist];
                    })
                }

                console.log("Filtering Artists for Home Page", searchObject);
                dispatch({type: "FILTER_ARTISTS", filteredArtists});

                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'FILTER_ARTISTS_ERROR', err});
                })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & LANGUAGE & LGBTQ. RACE & LANGUAGE & LGBTQ. RACE & LANGUAGE & LGBTQ. RACE & LANGUAGE & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & LANGUAGE & LGBTQ. RACE & REGION & LANGUAGE & LGBTQ. RACE & REGION & LANGUAGE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & LANGUAGE & LGBTQ. RACE & REGION & COUNTRY & LANGUAGE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && !searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & RELIGION & LGBTQ. RACE & RELIGION & LGBTQ. RACE & LANGUAGE & LGBTQ. RACE & RELIGION & LGBTQ.
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RaceTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & RELIGION & LGBTQ. RACE & REGION & RELIGION & LGBTQ. RACE & REGION & RELIGION & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.RegionTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & RELIGION & LGBTQ. RACE & REGION & COUNTRY & RELIGION & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && !searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm)
                .where("ethnicity", "array-contains", searchObject.AffinityTerm.CountryTerm).get().then((snapshot) => {
            console.log(snapshot);

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists = snapshot.docs.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & RELIGION & LANGUAGE & LGBTQ. RACE & RELIGION & LANGUAGE & LGBTQ. RACE & RELIGION & LANGUAGE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && !searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RaceTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & RELIGION & LANGUAGE & LGBTQ. RACE & REGION & RELIGION & LANGUAGE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && !searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.RegionTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------
    --RACE & REGION & COUNTRY & RELIGION & LANGUAGE & LGBTQ. RACE & REGION & COUNTRY & RELIGION & LANGUAGE & LGBTQ. 
    ------------------------------------------------------------------------------------------------------------------------------------*/
    else if (searchObject.AffinityTerm.RaceTerm && searchObject.AffinityTerm.RegionTerm && searchObject.AffinityTerm.CountryTerm
        && searchObject.AffinityTerm.ReligionTerm && searchObject.AffinityTerm.LanguageTerm && (searchObject.AffinityTerm.SexualityTerm 
            || searchObject.AffinityTerm.GenderTerm))
    {
        if (searchObject.AffinityTerm.SexualityTerm)
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("sexuality", "==", searchObject.AffinityTerm.SexualityTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        } else
        {
            db.collection('users').where("username", "==", searchObject.NamesTerm).where("languages", "array-contains", searchObject.AffinityTerm.LanguageTerm)
                .where("religion", "==", searchObject.AffinityTerm.ReligionTerm)
                .where("gender", "==", searchObject.AffinityTerm.GenderTerm).get().then((snapshot) => {
            console.log(snapshot);

            //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
            let tempArtists = snapshot.docs.filter(snap => (snap.data().ethnicity.includes(searchObject.AffinityTerm.CountryTerm)));

            if (searchObject.StyleTerm)
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().style.includes(searchObject.StyleTerm)));
                let tempArtists3 = tempArtists2.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists3.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            } else
            {
                //FILTER ARTISTS AND RETURN ARRAY OF RACIAL ARTISTS.
                let tempArtists2 = tempArtists.filter(snap => (snap.data().profession.includes(searchObject.ArtistryTerm)));
                let docArtist;
                tempArtists2.forEach(doc =>  {
                    docArtist = doc.data();
                    filteredArtists = [...filteredArtists, docArtist];
                })
            }

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'FILTER_ARTISTS_ERROR', err});
            })
        }
    }
}