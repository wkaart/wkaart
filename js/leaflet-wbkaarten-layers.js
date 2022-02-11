 
var RD = new L.Proj.CRS(
    'EPSG:28992','+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs', {    
origin: [-285401.920, 903401.920],
resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  continuousWorld: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
//Layers voor achtergrondkaarten
const BRTw = {
	id: 'BRTw',
	name: 'BRT Water',
	layer: L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:28992/{z}/{x}/{y}.png', {
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};
const BRTgr = {
	id: 'BRTgr',
	name: 'BRT Grijs',
	layer: L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png', {
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};
const OpenTopoA = {
	id: 'OpenTopoA',
	name: 'OpenTopo achtergrondkaart',
	layer: L.tileLayer('https://geodata.nationaalgeoregister.nl/tiles/service/wmts/opentopoachtergrondkaart/EPSG:28992/{z}/{x}/{y}.png', {
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};
const OpenTopo = {
	id: 'OpenTopo',
	name: 'OpenTopo',
	layer: L.tileLayer('https://geodata.nationaalgeoregister.nl/tiles/service/wmts/opentopo/EPSG:28992/{z}/{x}/{y}.png', {
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};  
const NoBase = {
	id: 'NoBase',
	name: 'Geen achtergrond',
	layer: L.tileLayer(''),
};
//Layers voor grenzen
const Prov = {
	id: 'Prov',
	name: 'G: Provincies', 
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/ows?SERVICE=WMS', {
		layers: 'cbsgebiedsindelingen:cbs_provincie_2021_gegeneraliseerd',
		minZoom: 2,
		maxZoom: 12,
		format: 'image/png',
		tileSize: 2048,
		opacity: 0.5,
		transparent: 'true',
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};
const gem = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/ows?SERVICE=WMS', {
	layers: 'cbsgebiedsindelingen:cbs_gemeente_2021_gegeneraliseerd',
	transparent: 'true',
	minZoom: 3,
	maxZoom: 14,
	tileSize: 2048,
    opacity: 0.6,
	format: 'image/png',
	attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
});
const gem_labels = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/ows?SERVICE=WMS', {
	layers: 'cbsgebiedsindelingen:cbs_gemeente_2021_labelpoint',
	transparent: 'true',
	minZoom: 5,
	maxZoom: 14,
	tileSize: 2048,
    opacity: 0.8,
	format: 'image/png',
	attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
});
//Layergroup voor gemeenten met label
const GemMetLab = {
	id: 'GemMetLab',
	name: 'G: Gemeenten',
	layer: L.layerGroup([gem, gem_labels]),
};
//Waterschappen van: https://www.nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/684ff4f6-1652-45a8-93f0-8e16d37b2a66
const GrWS = {
	id: 'GrWS',
	name: 'G: Waterschappen',
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/hwh/eenheden/wms/v1_0?',{
		layers: 'AU.AdministrativeUnit',
		transparent: 'true',
		format: 'image/png',
		tileSize: 1024,
		opacity: 0.8,
		format: 'image/png'
	}),
};
const VR = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/ows?SERVICE=WMS', {
	layers: 'cbsgebiedsindelingen:cbs_veiligheidsregio_2021_gegeneraliseerd',
	transparent: 'true',
	minZoom: 2,
	maxZoom: 12,
	tileSize: 2048,
    opacity: 0.7,
	format: 'image/png',
	attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
});
const VR_labels = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/ows?SERVICE=WMS', {
	layers: 'cbsgebiedsindelingen:cbs_veiligheidsregio_2020_labelpoint',
	transparent: 'true',
	minZoom: 4,
	maxZoom: 12,
	tiled: true,
	tileSize: 2048,
    opacity: 0.9,
	format: 'image/png',
	attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
});
//Layergroup voor veiligheidsregio met label
const VRenLab = {
	id: 'VRenLab',
	name: 'G: Veiligheidsregios',
	layer: L.layerGroup([VR, VR_labels]),
};
const GrRWSKwan = {
	id: 'GrRWSKwan',
	name: "G: RWS Kwantiteit <a target='_blank' href='https://maps.rijkswaterstaat.nl/dataregister/srv/dut/catalog.search#/metadata/cdbea91f-e76c-494a-921d-7a1e75a2d5f9'>(i)</a>", 
	layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/waterbeheergrenzen/ows?',{
	layers: 'waterkwantiteit', 
	opacity: 0.3, 
	tileSize: 2048,
    transparent: 'true',
  	format: 'image/png'
	}),
};
const GrRWSWwerken = {
	id: 'GrRWSWwerken',
	name: "G: RWS Waterstaatkundig beheer <a target='_blank' href='https://maps.rijkswaterstaat.nl/dataregister/srv/dut/catalog.search#/metadata/19a51337-8c9d-4386-b861-d4876e8f93ad'>(i)</a>", 
	layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/waterbeheergrenzen/ows?',{
	layers: 'waterstaatswerken', 
	opacity: 0.6, 
	tileSize: 2048,
    transparent: 'true',
  	format: 'image/png'
	}),
};
const RWSdis = {
    id: 'RWSdis',
	name: "G: RWS districten <a target='_blank' href='Images/VWMadelingen_RWSdistricten.png'>(met VWM)</a>",
	layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/regiogebieden_rijkswaterstaat/ows?',{
		layers: 'rijkswaterstaat_districten_nat', 
		service: 'WMS',
		version: '1.3.0',
		minZoom: 2,
		maxZoom: 19,
		opacity: 0.6, 
		transparent: 'true',
		format: 'image/png'
	}),
};
//Layers voor achtergrondkaarten
const LuFo = {
	id: 'LuFo',
	name: 'A: Luchtfoto',
	layer: L.tileLayer('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_ortho25/EPSG:28992/{z}/{x}/{y}.jpeg',{
		opacity: 0.6,
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};
const LabGeb = {
	id: 'LabGeb',
	name: 'A: Labels polders ea',
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/top10nlv2/ows?',{
		layers: 'geografischgebiedvlaklabelnaamnl',
		styles: 'top10nlv2:Geografisch_gebied_vlak_naam_NL_style',
		tiled: 'false',
		tileSize: 2048,
		minZoom: 9,
		maxZoom: 19,   
		transparent: 'true',
		opacity: 0.9,
		format: 'image/png'
	}),
};
const Terrein = {
	id: 'Terrein',
	name: 'A: Terrein',
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/top10nlv2/ows?',{
		layers: 'terreinvlakvoorkomen',
		minZoom: 9,
		maxZoom: 19,   
		transparent: 'true',
		opacity: 0.8,
		format: 'image/png'
	}),
};
const KM = {
	id: 'KM',
	name: 'A: Kilometrering',
	layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/nwb_vaarwegen/ows?SERVICE=WMS&',{
		layers: 'kilometermarkeringen',
	//	style: 'kmmarkeringen_met_labels', 
		minZoom: 8,
		maxZoom: 14,   
		transparent: 'true',
		opacity: 0.65,
		format: 'image/png'
	}),
};
//Layers voor themas
const AHN3 = {
	id: 'AHN3',
	name: 'T: Hoogte (AHN)',
	layer: L.tileLayer('https://geodata.nationaalgeoregister.nl/tiles/service/wmts/ahn3_5m_dsm/EPSG:28992/{z}/{x}/{y}.png', {
		minZoom: 1,
		maxZoom: 19,
		opacity: 0.6,
//		CRS: 'EPSG:28992',
		format: 'image/png',
		attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
	}),
};	
const FysGeo = {
	id: 'FysGeo',
	name: "T: Fysisch geografische regios <a target='_blank' href='https://www.nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/c8b5668f-c354-42f3-aafc-d15ae54cf170?tab=general'>(i)</a>",
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/fysischgeografischeregios/wms?',{
		layers: 'fysischgeografischeregios',
		transparent: 'true',
		opacity: 0.37,
		format: 'image/png'
	}),
};
const LabHoog = {
	id: 'LabHoog',
	name: 'T: Hoogtepunten',
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/top10nlv2/ows?',{
		layers: 'hoogtepuntlabel',
		minZoom: 9,
		maxZoom: 19,   
		transparent: 'true',
		format: 'image/png',
		opacity: 0.8,
		format: 'image/png'
	}),
};
//Layers voor droogte
const SPI1 = {
    id: 'SPI1',
	name: "Wb: SPI-1 <a target='_blank' href='http://knmi-spi-monitor-frontend-prd.s3-website-eu-west-1.amazonaws.com/'>(i)</a>",
	layer: L.tileLayer.wms('https://adaguc-server-spi-monitor.pub.knmi.cloud//wms?DATASET=NL_SPI',{
		layers: 'spi_daily_spi1',
		styles: 'spi/nearest',
		version: '1.3.0',
		opacity: 0.7, 	
		format: 'image/png'
	}),
};
const SPI3 = {
    id: 'SPI3',
	name: "Wb: SPI-3 <a target='_blank' href='http://knmi-spi-monitor-frontend-prd.s3-website-eu-west-1.amazonaws.com/'>(i)</a>",
	layer: L.tileLayer.wms('https://adaguc-server-spi-monitor.pub.knmi.cloud//wms?DATASET=NL_SPI',{
		layers: 'spi_daily_spi3',
		styles: 'spi/nearest',
		version: '1.3.0',
		opacity: 0.7, 	
		format: 'image/png'
	}),
};
const SPI6 = {
    id: 'SPI6',
	name: "Wb: SPI-6 <a target='_blank' href='http://knmi-spi-monitor-frontend-prd.s3-website-eu-west-1.amazonaws.com/'>(i)</a>",
	layer: L.tileLayer.wms('https://adaguc-server-spi-monitor.pub.knmi.cloud//wms?DATASET=NL_SPI',{
		layers: 'spi_daily_spi6',
		styles: 'spi/nearest',
		version: '1.3.0',
		opacity: 0.7, 	
		format: 'image/png'
	}),
};
//Layers voor natuur
const N2000 = {
    id: 'N2000',
	name: "N: Natura2000 <a target='_blank' href='https://www.natura2000.nl/gebieden'>(i)</a>",
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/natura2000/wms?',{
		layers: 'natura2000',
		version: '1.3.0',
		opacity: 0.65, 	
		transparent: 'true',
		format: 'image/png'
	}),
};
const NNN = {
    id: 'NNN',
	name: "N: Natuurnetwerk Nederland <a target='_blank' href='https://www.atlasleefomgeving.nl/natuurnetwerk-nederland-ehs'>(i)</a>",
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/provincies/ps/wms/v1?',{
		layers: 'PS.ProtectedSite.nlps-nnn',
		version: '1.3.0',
		opacity: 0.5, 	
		transparent: 'true',
		format: 'image/png'
	}),
};
const Wetlands = {
    id: 'Wetlands',
	name: "N: Wetlands <a target='_blank' href='https://www.natuurgegevens.nl/node/38'>(i)</a>",
	layer: L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/wetlands/wms?',{
		layers: 'wetlands',
		version: '1.3.0',
		opacity: 0.6, 	
		transparent: 'true',
		format: 'image/png'
	}),
};
//Layers voor waterveiligheid
const KerRWSreg = {
	id: 'KerRWSreg',
	name: "V: Keringen regionaal RWS <a target='_blank' href='https://maps.rijkswaterstaat.nl/dataregister/srv/dut/catalog.search#/metadata/231de5bc-9a79-43dd-aad9-c3d821228b1c?tab=relations'>(i)</a>",
	layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/regionale_keringen/ows?',{
		layers: 'regionale_keringen_rws', 
		service: 'WMS',
		version: '1.3.0',
		minZoom: 4,
		maxZoom: 19,   
		transparent: 'true',
		format: 'image/png'
	}),
};
const KerPrim = {
	id: 'KerPrim',
	name: "V: Keringen primair (sign.) <a target='_blank' href='https://waterveiligheidsportaal.nl/#/nss/nss/norm'>(i)</a>",
    layer: L.tileLayer.wms('https://waterveiligheidsportaal.nl/geoserver/nbpw/ows?SERVICE=WMS&',{
		layers: 'dijktrajecten', 
		style: 'NBPW_signaleringswaarde',
		version: '1.3.0',
		minZoom: 1,
		maxZoom: 19,   
		transparent: true,
		pane: 'kerPrimPane',
		format: 'image/png'
	}),
};
const KerWS = {
	id: 'KerWS',
	name: "V: Keringen waterschappen <a target='_blank' href='https://www.nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/e55d0ae4-fd31-440f-8faa-9e28dcc7a5a5'>(i)</a>",
    layer: L.tileLayer.wms('https://service.pdok.nl/hwh/keringenimwa/wms/v1_0?',{
		layers: 'waterkering', 
		version: '1.3.0',
		minZoom: 1,
		maxZoom: 19,   
		opacity: 0.7,
		transparent: true,
		format: 'image/png'
	}),
};
const WBerging = {
	id: 'WBerging',
	name: "V: Waterbergingsgebieden <a target='_blank' href='https://www.nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/f06984ba-5e3c-4fa6-9078-a69617122d67'>(i)</a>",
    layer: L.tileLayer.wms('https://service.pdok.nl/hwh/oppwaterimwa/wms/v1_0?',{
		layers: 'Waterbergingsgebied', 
//		version: '1.3.0',
		transparent: 'true',
		format: 'image/png'
	}),
};
const Inun_reg_mid = {
	id: 'Inun_reg_mid',
	name: "V: Overstroombaar middelgrote kans <a target='_blank' href='https://basisinformatie-overstromingen.nl/#/viewer/5'>(i)</a>",
    layer: L.tileLayer.wms('https://geodata.basisinformatie-overstromingen.nl/geoserver/LIWO_Basis/ows?SERVICE=WMS&',{
		layers: 'MaximaleWaterdiepte_D_RegionaalOnbeschermd_Kaart2', 
//		version: '1.3.0',
		transparent: 'true',
		opacity: 0.6,
		format: 'image/png'
	}),
};
const Inun_HWS_mid = {
	id: 'Inun_HWS_mid',
	name: "V: Overstroombaar middelgrote kans <a target='_blank' href='https://basisinformatie-overstromingen.nl/#/viewer/2'>(i)</a>",
    layer: L.tileLayer.wms('https://geodata.basisinformatie-overstromingen.nl/geoserver/LIWO_Basis/ows?SERVICE=WMS&',{
		layers: 'MaximaleWaterdiepte_A_PrimairOnbeschermd_Kaart2', 
//		version: '1.3.0',
		transparent: 'true',
		opacity: 0.6,
		format: 'image/png'
	}),
};
const InunMid = {
	id: 'InunMid',
	name: "V: Inundatie kans mid <a target='_blank' href='https://basisinformatie-overstromingen.nl/#/viewer/2'>(i)</a>",
	layer: L.layerGroup([Inun_HWS_mid.layer, Inun_reg_mid.layer]),
};
const InunMax = {
	id: 'InunMax',
	name: "V: Overstroombaar maximaal <a target='_blank' href='https://basisinformatie-overstromingen.nl/#/viewer/9'>(i)</a>",
    layer: L.tileLayer.wms('https://geodata.basisinformatie-overstromingen.nl/geoserver/LIWO_Basis/ows?SERVICE=WMS&',{
		layers: 'Overstroomik_opvullen_combined', 
//		version: '1.3.0',
		transparent: 'true',
		opacity: 0.4,
		format: 'image/png'
	}),
};
//Lagen voor vaarwegen
const Bevaar = {
	id: 'Bevaar',
	name: "Vw: Bevaarbaarheid <a target='_blank' href='https://geo.rijkswaterstaat.nl/services/ogc/gdr/vaarweginformatie/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=vaarweginformatie%3Abevaarbaarheid' >(i)</a>",
    layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/vaarweginformatie/ows?SERVICE=WMS&',{
		layers: 'bevaarbaarheid', 
		version: '1.3.0',
		minZoom: 1,
		maxZoom: 19,   
		transparent: 'true',
		format: 'image/png'
	}),
};
//const Sluizen = {
//	id: 'Sluizen',
//	name: "KW: Sluizen <a target='_blank' href='https://maps.rijkswaterstaat.nl/dataregister/srv/dut/catalog.search#/metadata/db781c99-29fd-492c-9b2d-29fcf9295f2c?tab=general'>(i)</a>",
//    layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/vaarweginformatie/ows?SERVICE=WMS&',{
//		layers: 'sluis', 
//		version: '1.3.0',
//		minZoom: 1,
//		maxZoom: 19,   
//		transparent: 'true',
//		format: 'image/png'
//	}),
//};
const MGD = {
	id: 'MGD',
	name: "Vw: Trajecten MGDs <a target='_blank' href='https://www.vaarweginformatie.nl/frp/main/#/hydro/mgd'>(i)</a> <a target='_blank' href='Images/MGDs_kaart.jpg'>(k)</a>",
    layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/vaarweginformatie/ows?SERVICE=WMS&',{
		layers: 'minst_gepeilde_diepte', 
		version: '1.3.0',
		minZoom: 1,
		maxZoom: 19,   
		transparent: 'true',
		format: 'image/png'
	}),
};
const VWkaart = {
	id: 'VWkaart',
	name: "Vw: Vaarwegenkaart 2013",
    layer: L.tileLayer.wms('https://geo.rijkswaterstaat.nl/services/ogc/gdr/vaarwegenkaart/ows?SERVICE=WMS&',{
		layers: 'vaarwegenkaart',
		version: '1.3.0',
		minZoom: 1,
		maxZoom: 19,   
		transparent: 'true',
		format: 'image/png'
	}),
};

const sluizenrws = {
	id: 'sluizenrws',
	name: "KW: Sluizen RWS",
	layer: L.geoCsv(null, {
		onEachFeature: function (feature, layer) {
			var popup = '';
			for (var clave in feature.properties) {
				var title = sluizenrws.layer.getPropertyTitle(clave);
				popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br />';
			}
			layer.bindPopup(popup);
			layer.bindTooltip(popup);
		},
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 5,
				weight: 1,
				opacity: 1,
				fillOpacity: 1,
				color: '#ffffb4',
				fillColor: '#4e7389'
			});
		},
		firstLineTitles: true,
		debug: true,
		fieldSeparator: ';'
	}),
};

$.ajax ({
	type:'GET',
	dataType:'text',
	url:'data/sluizenrws.csv',
   error: function() {
     alert('No se pudieron cargar los datos');
   },
	success: function(csv) {
		sluizenrws.layer.addData(csv);
//		map.addLayer(sluizenrws.layer);
	},
   complete: function() {
      $('#cargando').delay(500).fadeOut('slow');
   }
});

const Sluizen = {
	id: 'Sluizen',
	name: "KW: Sluizen totaal",
	layer: L.geoCsv(null, {
		onEachFeature: function (feature, layer) {
			var popup = '';
			for (var clave in feature.properties) {
				var title = Sluizen.layer.getPropertyTitle(clave);
				popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br />';
			}
			layer.bindTooltip(popup);
			layer.bindPopup(popup);
		},
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 4,
				weight: 1,
				opacity: 1,
				fillOpacity: 1,
				fillColor: '#4e7389',
				color: '#ffffb4'
			});
		},
		firstLineTitles: true,
		debug: true,
		fieldSeparator: ';'
	}),
};

$.ajax ({
	type:'GET',
	dataType:'text',
	url:'data/sluizen.csv',
   error: function() {
     alert('Gegevens niet gevonden');
   },
	success: function(csv) {
		Sluizen.layer.addData(csv);
//		map.addLayer(Sluizen.layer);
	},
   complete: function() {
      $('#cargando').delay(500).fadeOut('slow');
   }
});

const svk_keer = {
	id: 'svk_keer',
	name: 'KW: Stormvlkeringen en keerschuiven',
	layer: L.geoCsv(null, {
		onEachFeature: function (feature, layer) {
			var popup = '';
			for (var clave in feature.properties) {
				var title = svk_keer.layer.getPropertyTitle(clave);
				popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br />';
			}
			layer.bindTooltip(popup);
			layer.bindPopup(popup);
			layer.setStyle ({weight:9, color: '#e6194B'});
		},
		firstLineTitles: true,
		debug: true,
		activeWKT: true,
		pane: 'svk',
		fieldSeparator: ';'
	}),
};

$.ajax ({
	type:'GET',
	dataType:'text',
	url:'data/svk_keerschuiven.csv',
   error: function() {
     alert('Gegevens niet gevonden');
   },
	success: function(csv) {
		svk_keer.layer.addData(csv);
	},
   complete: function() {
      $('#cargando').delay(500).fadeOut('slow');
   }
});

const stuwen = {
	id: 'stuwGroot',
	name: 'KW: Stuwen in rijkswateren en Vecht',
	layer: L.geoCsv(null, {
		onEachFeature: function (feature, layer) {
			var popup = '';
			for (var clave in feature.properties) {
				var title = stuwen.layer.getPropertyTitle(clave);
				popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br />';
			}
			layer.bindTooltip(popup);
			layer.bindPopup(popup);
			layer.setStyle ({weight:9, color: '#1a1aff'});
		},
		firstLineTitles: true,
		debug: true,
		activeWKT: true,
		pane: 'svk',
		fieldSeparator: ';'
	}),
};

$.ajax ({
	type:'GET',
	dataType:'text',
	url:'data/stuwgroot.csv',
   error: function() {
     alert('Gegevens niet gevonden');
   },
	success: function(csv) {
		stuwen.layer.addData(csv);
	},
   complete: function() {
      $('#cargando').delay(500).fadeOut('slow');
   }
});
const stuwenWS = {
	id: 'stuwenWS',
	name: 'Wb: Stuwen waterschappen',
	layer: L.tileLayer.wms('https://service.pdok.nl/hwh/kunstwrkimwa/wms/v1_0?',{
		layers: 'stuw',
		minZoom: 9,
		transparent: 'true',
		format: 'image/png',
		format: 'image/png'
	}),
};

const stuwentot = {
	id: 'stuwen',
	name: 'KW: Stuwen',
	layer: L.layerGroup([stuwen.layer, stuwenWS.layer]),
};
