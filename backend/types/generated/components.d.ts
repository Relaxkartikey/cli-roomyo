import type { Schema, Struct } from '@strapi/strapi';

export interface SpaceAmenities extends Struct.ComponentSchema {
  collectionName: 'components_space_amenities';
  info: {
    description: 'Select available amenities for the space';
    displayName: 'Amenities';
  };
  attributes: {
    ac: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cctv: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cleaning: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    food: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    gym: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    laundry: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lift: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    other_amenities: Schema.Attribute.Text;
    parking: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    power_backup: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    security: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    study_room: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    wifi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SpacePrivileges extends Struct.ComponentSchema {
  collectionName: 'components_space_privileges';
  info: {
    description: 'Select available privileges for the space';
    displayName: 'Privileges';
  };
  attributes: {
    all_inclusive_price: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    cooking_allowed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    couples_allowed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    custom_privileges: Schema.Attribute.Text;
    flexible_move_in: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    flexible_move_out: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    flexible_payment: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    maintenance_included: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    no_security_deposit: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    other_privileges: Schema.Attribute.Text;
    pets_allowed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    short_term_allowed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    utility_included: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    visitors_allowed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'space.amenities': SpaceAmenities;
      'space.privileges': SpacePrivileges;
    }
  }
}
