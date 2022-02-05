
function angel(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    _len = Math.sqrt(dx * dx + dy * dy);
    var ret = Math.asin(dx / _len);
    if (dy < 0) {
        ret = -1 * ret;
    } else {
        ret = ret;
    }
    return ret
}

function angel_x_axis(p1, p2) {
    var rot = angel(
        p1.y, p1.z,
        p2.y, p2.z
    );
    return rot;
}

function rotate_x_axis(p1, p2, rot) {

    ret = {};

    ret.x = p1.x;
    ret.y = p1.y;
    ret.z = p1.z;
    var dx21 = p2.x - p1.x;
    var dy21 = p2.y - p1.y;
    var dz21 = p2.z - p1.z;

    // help here:
    // https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
    
    // x axis
    // |1     0           0| |x|   |        x        |   |x'|
    // |0   cos θ    −sin θ| |y| = |y cos θ − z sin θ| = |y'|
    // |0   sin θ     cos θ| |z|   |y sin θ + z cos θ|   |z'|

    ret.x += dx21;
    ret.y += dy21 * Math.cos(rot) - dz21 * Math.sin(rot);
    ret.z += dy21 * Math.sin(rot) + dz21 * Math.cos(rot);
    return ret;
}

function angel_y_axis(p1, p2) {
    var rot = angel(
        p1.x, p1.z,
        p2.x, p2.z
    );
    rot = -1.0 * rot;
    return rot;
}

function rotate_y_axis(p1, p2, rot) {
    ret = {};

    ret.x = p1.x;
    ret.y = p1.y;
    ret.z = p1.z;
    var dx21 = p2.x - p1.x;
    var dy21 = p2.y - p1.y;
    var dz21 = p2.z - p1.z;

    // help here:
    // https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
    
    // y axis
    // | cos θ    0   sin θ| |x|   | x cos θ + z sin θ|   |x'|
    // |   0      1       0| |y| = |         y        | = |y'|
    // |−sin θ    0   cos θ| |z|   |−x sin θ + z cos θ|   |z'|

    ret.x += dx21 * Math.cos(rot) + dz21 * Math.sin(rot);
    ret.y += dy21;
    ret.z += -1.0 * dx21 * Math.sin(rot) + dz21 * Math.cos(rot);
    return ret;
}

function angel_z_axis(p1, p2) {
    var rot = angel(
        p1.x, p1.y,
        p2.x, p2.y
    );
    return rot;
}

function rotate_z_axis(p1, p2, rot) {

    ret = {};

    ret.x = p1.x;
    ret.y = p1.y;
    ret.z = p1.z;
    var dx21 = p2.x - p1.x;
    var dy21 = p2.y - p1.y;
    var dz21 = p2.z - p1.z;

    // help here:
    // https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
    
    // z axis
    // |cos θ   −sin θ   0| |x|   |x cos θ − y sin θ|   |x'|
    // |sin θ    cos θ   0| |y| = |x sin θ + y cos θ| = |y'|
    // |  0       0      1| |z|   |        z        |   |z'|

    ret.x += dx21 * Math.cos(rot) - dy21 * Math.sin(rot);
    ret.y += dx21 * Math.sin(rot) + dy21 * Math.cos(rot);
    ret.z += dz21;
    return ret;
}


function rotate_xyz_axis(p1, p2, rot_x, rot_y, rot_z) {

    ret = {};
    ret.x = p1.x;
    ret.y = p1.y;
    ret.z = p1.z;
    var dx21 = p2.x - p1.x;
    var dy21 = p2.y - p1.y;
    var dz21 = p2.z - p1.z;

    // help here:
    // https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
    
    // x axis
    // |1     0           0| |x|   |        x        |   |x'|
    // |0   cos θ    −sin θ| |y| = |y cos θ − z sin θ| = |y'|
    // |0   sin θ     cos θ| |z|   |y sin θ + z cos θ|   |z'|
    
    // z axis
    // |cos θ   −sin θ   0| |x|   |x cos θ − y sin θ|   |x'|
    // |sin θ    cos θ   0| |y| = |x sin θ + y cos θ| = |y'|
    // |  0       0      1| |z|   |        z        |   |z'|

    // y axis
    // | cos θ    0   sin θ| |x|   | x cos θ + z sin θ|   |x'|
    // |   0      1       0| |y| = |         y        | = |y'|
    // |−sin θ    0   cos θ| |z|   |−x sin θ + z cos θ|   |z'|

    // xy axis
    // | cos Y    sin Y * sin X     sin Y * cos X| |x|   | x * cos Y + y * sin X * sin Y + z sin Y * cos X |   |x'|
    // |   0      cos X                   - sin X| |y| = |  y * cos X - z sin X                            | = |y'|
    // |−sin Y    cos Y * sin X     cos Y * cos Y| |z|   |−x sin Y + y * cos Y * sin X + z cos Y * cos X   |   |z'|

    // https://steptosleep.ru/%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86%D0%B0-%D0%BF%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D1%82%D0%B0-%D0%B2-%D1%82%D1%80%D0%B5%D1%85%D0%BC%D0%B5%D1%80%D0%BD%D0%BE%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D1%82/

    var cos_x = Math.cos(rot_z) // alpha
    var cos_y = Math.cos(rot_y) // betta
    var cos_z = Math.cos(rot_x) // ygrek

    var sin_x = Math.sin(rot_z) // alpha
    var sin_y = Math.sin(rot_y) // betta
    var sin_z = Math.sin(rot_x) // ygrek
    
    // углы Эйлера

    ret.x += 0
        + dx21 * (cos_x * cos_y)
        + dy21 * (cos_x * sin_y * sin_z - sin_x * cos_z)
        + dz21 * (cos_x * sin_y * cos_z + sin_x * sin_z)
    ;

    ret.y += 0
        + dx21 * (sin_x * cos_y)
        + dy21 * (sin_x * sin_y * sin_z + cos_x * cos_z)
        + dz21 * (sin_x * sin_y * cos_z - cos_x * sin_z)
    ;
    ret.z += 0
        + dx21 * (-1.0 * sin_y)
        + dy21 * (cos_y * sin_z)
        + dz21 * (cos_y * cos_z)
    ;
    return ret;
}

function middle_point(tr) {
    var ret = {}
    ret.x = (tr.p1.x + tr.p2.x + tr.p3.x) / 3.0;
    ret.y = (tr.p1.y + tr.p2.y + tr.p3.y) / 3.0;
    ret.z = (tr.p1.z + tr.p2.z + tr.p3.z) / 3.0;
    return ret;
}

function rotate_triangle_to_z_axis(tr1) {
    var ret = {p1:{},p2:{},p3:{}};
    ret.p1.x = tr1.p1.x;
    ret.p1.y = tr1.p1.y;
    ret.p1.z = tr1.p1.z;

    ret.p2.x = tr1.p2.x;
    ret.p2.y = tr1.p2.y;
    ret.p2.z = tr1.p2.z;

    ret.p3.x = tr1.p3.x;
    ret.p3.y = tr1.p3.y;
    ret.p3.z = tr1.p3.z;
    
    var rot = 0.0;

    // parallel to y
    // rot = angel_x_axis(ret.p1, ret.p2);
    // ret.p2 = rotate_x_axis(ret.p1, ret.p2, rot);
    // ret.p3 = rotate_x_axis(ret.p1, ret.p3, rot);

    // parallel to z
    rot_x = angel_x_axis(ret.p1, ret.p2);
    rot_y = angel_y_axis(ret.p1, ret.p2);
    rot_z = 0.0; // angel_z_axis(ret.p1, ret.p2);
    ret.p2 = rotate_xyz_axis(ret.p1, ret.p2, rot_x, rot_y, rot_z);
    ret.p3 = rotate_xyz_axis(ret.p1, ret.p3, rot_x, rot_y, rot_z);

    rot_x = angel_x_axis(ret.p3, ret.p1);
    rot_y = angel_y_axis(ret.p3, ret.p1);
    rot_z = 0.0; // angel_z_axis(ret.p1, ret.p2);
    ret.p1 = rotate_xyz_axis(ret.p3, ret.p1, rot_x, rot_y, rot_z);
    ret.p3 = rotate_xyz_axis(ret.p3, ret.p3, rot_x, rot_y, rot_z);

    // rot_x = angel_x_axis(ret.p2, ret.p3);
    // rot_y = angel_y_axis(ret.p2, ret.p3);
    // rot_z = angel_z_axis(ret.p2, ret.p3);
// 
    // ret.p1 = rotate_xyz_axis(ret.p2, ret.p1, rot_x, rot_y, rot_z);
    // ret.p3 = rotate_xyz_axis(ret.p2, ret.p3, rot_x, rot_y, rot_z);
    
    // parallel to z
    // rot = angel_z_axis(ret.p1, ret.p2);
    // ret.p2 = rotate_z_axis(ret.p1, ret.p2, rot);
    // ret.p3 = rotate_z_axis(ret.p1, ret.p3, rot);
// 
    // rot = angel_x_axis(ret.p2, ret.p3);
    // ret.p1 = rotate_x_axis(ret.p2, ret.p1, rot);
    // ret.p3 = rotate_x_axis(ret.p2, ret.p3, rot);

    // rot = angel_y_axis(ret.p3, ret.p1);
    // ret.p2 = rotate_y_axis(ret.p1, ret.p2, rot);
    // ret.p3 = rotate_y_axis(ret.p1, ret.p3, rot);

    // p0 = middle_point(ret);
    // rot = angel_x_axis(ret.p1, ret.p2);
    // ret.p1 = rotate_x_axis(p0, ret.p1, rot);
    // ret.p2 = rotate_x_axis(p0, ret.p2, rot);
    // ret.p3 = rotate_x_axis(p0, ret.p3, rot);


    // p0 = middle_point(ret);
    // rot = angel_y_axis(p0, ret.p2);
    // ret.p1 = rotate_y_axis(p0, ret.p1, rot);
    // ret.p2 = rotate_y_axis(p0, ret.p2, rot);
    // ret.p3 = rotate_y_axis(p0, ret.p3, rot);


// 
    // rot = angel_z_axis(ret.p3, ret.p1);
    // ret.p1 = rotate_z_axis(ret.p3, ret.p1, rot);
    // ret.p2 = rotate_z_axis(ret.p3, ret.p2, rot);

    // var rot_z = angel_z_axis(ret.p1, ret.p2);
    // ret.p2 = rotate_z_axis(ret.p1, ret.p2, rot_z);
    // ret.p3 = rotate_z_axis(ret.p1, ret.p3, rot_z);

    // var rot_y = angel_y_axis(ret.p2, ret.p3);
    // ret.p3 = rotate_y_axis(ret.p2, ret.p3, rot_y);
    // ret.p1 = rotate_y_axis(ret.p2, ret.p1, rot_y);
// 
    // var rot_x = angel_x_axis(ret.p3, ret.p1);
    // ret.p1 = rotate_y_axis(ret.p3, ret.p1, rot_x);
    // ret.p2 = rotate_y_axis(ret.p3, ret.p2, rot_x);

    return ret
}
