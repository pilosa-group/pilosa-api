import { UnderscoreNamingStrategy } from '@mikro-orm/postgresql';

export class CustomNamingStrategy extends UnderscoreNamingStrategy {
  classToTableName(entityName: string): string {
    return super.classToTableName(entityName);
  }
  joinColumnName(propertyName: string) {
    return propertyName;
  }
  joinKeyColumnName(
    entityName: string,
    referencedColumnName: string,
    composite = false,
  ) {
    const name = entityName.substr(0, 1).toLowerCase() + entityName.substr(1);
    if (composite && referencedColumnName) {
      return name + '_' + referencedColumnName;
    }
    return name;
  }
  propertyToColumnName(propertyName: string) {
    return propertyName;
  }
}
