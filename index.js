//Modulos neceesarios para que funcione el backend
const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());

//funcion de conexion a la BD sin parametros
conecct = (sql,res,con) => {
    con.connect(function (err){
        if (err) {
            res.send(err);
        }
        else {
            con.query(sql, function (err,result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
};

//funcion de conexion a la BD con parametros
conecctParams = (sql,res,con,parametros) => {
    con.connect(function (err){
        if (err) {
            res.send(err);
        }
        else {
            con.query(sql,parametros, function (err,result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
};

//Get solo de tabla
app.get('/api/:tabla/', (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "exportacioneimportacion"
    });

    let sql = "select * from " + req.params.tabla;

    conecct(sql,res,con);
});

//Get por id de una tabla
app.get('/api/:tabla/:id', (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "exportacioneimportacion"
    });

    let sql;

    switch (req.params.tabla) {
        case "tbl_clientes":
            sql = "SELECT * FROM " + req.params.tabla + " where id_cliente = " + req.params.id;
            break;
            case "tbl_productos":
                sql = "SELECT * FROM " + req.params.tabla + " where id_producto = " + req.params.id;
                break;
                case "tbl_marcas":
                    sql = "SELECT * FROM " + req.params.tabla + " where id_marca = " + req.params.id;
                    break;
                    case "tbl_estado":
                        sql = "SELECT * FROM " + req.params.tabla + " where id_estado = " + req.params.id;
                        break;
                        case "tbl_tipoEnvio":
                            sql = "SELECT * FROM " + req.params.tabla + " where id_tipoEnvio = " + req.params.id;
                            break;
                            case "tbl_paises":
                                sql = "SELECT * FROM " + req.params.tabla + " where id_pais = " + req.params.id;
                                break;
                                case "tbl_pedidos":
                                    sql = "SELECT * FROM " + req.params.tabla + " where id_pedido = " + req.params.id;
                                    break;
        default:
            break;
    }

    conecct(sql,res, con);
});

//post para todas las tablas
app.post('/api/:tabla/', (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "exportacioneimportacion"
    });

    let sql;
    let parametros;

    switch (req.params.tabla) {
        case "tbl_clientes":
            sql = "insert into " + req.params.tabla + " (nombre_cliente, apellido_cliente, dni_cliente, direccion_cliente) " 
            + "values (?,?,?,?)";
            parametros = [req.body.nombre_cliente, req.body.apellido_cliente, req.body.dni_cliente, req.body.direccion_cliente];
            break;
            case "tbl_productos":
                sql = "insert into " + req.params.tabla + " (nombre_producto, caracteristicas_producto, id_marca) " 
                + "values (?,?,?)";
                parametros = [req.body.nombre_producto, req.body.caracteristicas_producto, req.body.id_marca];
            break;
            case "tbl_marcas":
                sql = "insert into " + req.params.tabla + " (nombre_marca, pais_origen) " 
                + "values (?,?)";
                parametros = [req.body.nombre_marca, req.body.pais_origen];
            break;
            case "tbl_estado":
                sql = "insert into " + req.params.tabla + " (tipo_estado) " 
                + "values (?)";
                parametros = [req.body.tipo_estado];
            break;
            case "tbl_tipoEnvio":
                sql = "insert into " + req.params.tabla + " (el_tipoEnvio) " 
                + "values (?)";
                parametros = [req.body.el_tipoEnvio];
            break;
            case "tbl_paises":
                sql = "insert into " + req.params.tabla + " (nombre_pais) " 
                + "values (?)";
                parametros = [req.body.nombre_pais];
            break;
            case "tbl_pedidos":
                sql = "insert into " + req.params.tabla + " (id_cliente, id_producto, id_estado, id_pais, id_tipoEnvio, fecha_pedido) " 
                + "values (?, ?, ?, ?, ?, ?)";
                parametros = [req.body.id_cliente, req.body.id_producto, req.body.id_estado, req.body.id_pais, req.body.id_tipoEnvio, req.body.fecha_pedido];
            break;
    
        default:
            break;
    }

    //funcion de conexion con parametros
    conecctParams(sql,res, con,parametros);
});

//put por id de la tabla escrita
app.put("/api/:tabla/:id", (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "exportacioneimportacion"
    })

    switch (req.params.tabla) {
        case "tbl_clientes":
            sql = "update " + req.params.tabla + " set nombre_cliente = ?, apellido_cliente = ?, dni_cliente = ?, direccion_cliente = ? " +
            "where id_cliente = ?";
            parametros = [req.body.nombre_cliente, req.body.apellido_cliente, req.body.dni_cliente, req.body.direccion_cliente, req.params.id];
            break;
            case "tbl_productos":
                sql = "update " + req.params.tabla + " set nombre_producto = ?, caracteristicas_producto = ?, id_marca = ? where id_producto = ?"; 
                parametros = [req.body.nombre_producto, req.body.caracteristicas_producto, req.body.id_marca, req.params.id];
            break;
            case "tbl_marcas":
                sql = "update " + req.params.tabla + " set nombre_marca = ?, pais_origen = ? where id_marca = ?";
                parametros = [req.body.nombre_marca, req.body.pais_origen, req.params.id];
            break;
            case "tbl_estado":
                sql = "update " + req.params.tabla + " set tipo_estado = ? where id_estado = ?" ;
                parametros = [req.body.tipo_estado, req.params.id];
            break;
            case "tbl_tipoEnvio":
                sql = "update " + req.params.tabla + " set el_tipoEnvio = ? where id_tipoEnvio = ?";
                parametros = [req.body.el_tipoEnvio, req.params.id];
            break;
            case "tbl_paises":
                sql = "update " + req.params.tabla + " set nombre_pais = ? where id_pais = ?"; 
                parametros = [req.body.nombre_pais, req.params.id];
            break;
            case "tbl_pedidos":
                sql = "update " + req.params.tabla + " set id_cliente = ?, id_producto = ?, id_estado = ?, id_pais = ?, id_tipoEnvio = ?, fecha_pedido = ? where id_pedido = ?";
                parametros = [req.body.id_cliente, req.body.id_producto, req.body.id_estado, req.body.id_pais, req.body.id_tipoEnvio, req.body.fecha_pedido, req.params.id];
            break;
    
        default:
            break;
    }

    conecctParams(sql,res, con,parametros);
});

//delete por id para la tabla escrita
app.delete('/api/:tabla/:id', (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : "",
        database: "exportacioneimportacion"
    })

    let sql;

    switch (req.params.tabla) {
        case "tbl_clientes":
            sql = "delete from " + req.params.tabla + " where id_cliente = " + req.params.id;
            break;
            case "tbl_productos":
                sql = "delete from " + req.params.tabla + " where id_producto = " + req.params.id; 
            break;
            case "tbl_marcas":
                sql = "delete from " + req.params.tabla + " where id_marca = " + req.params.id;
            break;
            case "tbl_estado":
                sql = "delete from " + req.params.tabla + " where id_estado = " + req.params.id; 
            break;
            case "tbl_tipoEnvio":
                sql = "delete from " + req.params.tabla + " where id_tipoEnvio = " + req.params.id;
            break;
            case "tbl_paises":
                sql = "delete from " + req.params.tabla + " where id_pais = " + req.params.id;
            break;
            case "tbl_pedidos":
                sql = "delete from " + req.params.tabla + " where id_pedido = " + req.params.id;
            break;
    
        default:
            break;
    }

    conecct(sql,res, con);
})

app.listen(3000);